import './styles/index.less';

import React from 'react';
import PropTypes from 'prop-types';

import Modal from '$common/components/modals/components/container';

const STATUS = {
    init: 'init',
    pull: 'pull',
    pulldown: 'pulldown',
    refreshing: 'refreshing',
    refreshed: 'refreshed'
};

const defaultProps = {
    id: 'pull-refresh',
    insertWay: 'prepend',
    styles: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 'auto',
        'z-index': 99
    }
};

export default class PullRefreshCom extends React.Component {
    constructor(props) {
        super(props);
        const {
            maxPullRefreshDistance
        } = props;
        this.startPositionY = 0;
        this.state = {
            showing: false,
            status: STATUS.init,
            pullHeight: 0,
            transform: -maxPullRefreshDistance,
            height: maxPullRefreshDistance,
        };
    }

    static defaultProps = {
        duration: 50,
        // maxPullRefreshDistance: Math.floor(window.screen.availHeight / 10),
        maxPullRefreshDistance: 100,
        refreshFunc: () => {
            return new Promise((resolve, reject) => {
                try {
                    location.reload();
                    resolve();
                } catch (err) {
                    err instanceof Error ? reject(err) : reject(new Error(err));
                }
            })
        }
    }

    static propTypes = {
        duration: PropTypes.number,
        maxPullRefreshDistance: PropTypes.number,
        refreshFunc: PropTypes.func
    }

    componentDidMount() {
        document.addEventListener('touchstart', (e) => {
            this.touchStartHandle(e);
        }, false)

        document.addEventListener('touchmove', (e) => {
            this.touchMoveHandle(e);
        }, false);

        document.addEventListener('touchend', (e) => {
            this.touchEndHandle(e);
        }, false)
    }

    touchStartHandle = (e) => {
        this.setState({showing: true});
        if (!this.canRefresh()) return false;
        if (e.touches.length === 1) {
            this.startPositionY = e.touches[0].clientY;
        }
    }

    touchMoveHandle = (e) => {
        if (!this.canRefresh()) return false;
        const {
            status
        } = this.state;
        const {
            maxPullRefreshDistance
        } = this.props;
        let distance = Math.ceil(e.touches[0].clientY - this.startPositionY);
        // const distanceDiff = distance - maxPullRefreshDistance;
        // distance = distanceDiff < 3 && distanceDiff > 0 ? maxPullRefreshDistance : distance;
        if (
            status === STATUS.pulldown ||
            distance < 10 ||
            this.isNotAtTop()
        ) return false;

        distance = distance >= maxPullRefreshDistance ? maxPullRefreshDistance : distance;
        this.setState({
            status: distance >= maxPullRefreshDistance ? STATUS.pulldown : STATUS.pull,
            pullHeight: distance,
            transform: distance - maxPullRefreshDistance
        });
    }

    touchEndHandle = (e) => {
        this.setState({showing: false})
        if (!this.canRefresh()) return false;
        const {
            status,
            pullHeight
        } = this.state;
        const {
            maxPullRefreshDistance
        } = this.props;
        if (this.isNotAtTop()) {
            this.setState({
                status: STATUS.init,
                transform: -maxPullRefreshDistance
            })
            return false;
        }
        if (status !== STATUS.pulldown) {
            this.pullTransition({
                end: pullHeight
            });
            return false;
        };

        this.setState({
            status: STATUS.refreshing
        });

        setTimeout(() => {
            this.props.refreshFunc().then(() => {
                this.pullTransition();
            })
        }, 200);
    }

    scrollTop() {
        if (window.pageYOffset > 0) {
            return window.pageYOffset;
        } else if (document.body.scrollTop > 0) {
            return document.body.scrollTop;
        } else if (document.documentElement.scrollTop > 0) {
            return document.documentElement.scrollTop;
        } else {
            return 0;
        }
    }

    isNotAtTop() {
        return this.scrollTop() > 0;
    }

    canRefresh() {
        const {
            refreshFunc
        } = this.props;
        const {
            status
        } = this.state;
        return refreshFunc && STATUS.refreshing !== status;
    }

    pullTransition = (opt = {}) => {
        let {
            maxPullRefreshDistance,
            duration
        } = this.props;
        const {
            pullHeight
        } = this.state;
        duration = Math.floor(pullHeight / maxPullRefreshDistance * duration);

        const option = {
            currentTime: 0,
            begin: opt.begin || 0,
            end: opt.end || maxPullRefreshDistance,
            duration: opt.duration || duration,
            callback: opt.callback || false
        };

        const step = () => {
            const distance = pullHeight - maxPullRefreshDistance - this.easeInOut(option.currentTime, option.begin, option.end - option.begin, option.duration);
            option.currentTime++;
            this.setState({
                transform: distance
            })

            if (option.currentTime <= option.duration) {
                requestAnimationFrame(step)
            } else {
                option.callback && option.callback();
            }
        };

        step();
    }

    /**
     * [Linear 缓动算法]
     * @param {[type]} t [current time（当前时间）]
     * @param {[type]} b [beginning value（初始值）]
     * @param {[type]} c [change in value（变化量）]
     * @param {[type]} d [duration（持续时间）]
     */
    easeInOut(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    }

    render() {
        const {
            status,
            height,
            transform
        } = this.state;

        const style = {
            height: `${height}px`,
            transform: `translateY(${transform}px)`
        };

        return ( 
            <Modal showing={this.state.showing} {...defaultProps}>
                <div 
                    ref = {(el) => this.el = el} 
                    className = {`pullrefresh ${status}`}
                // onTouchStart = { this.touchStartHandle }
                // onTouchMove = { this.touchMoveHandle }
                // onTouchEnd = { this.touchEndHandle }
                >
                    <div 
                        className = 'pullrefresh__header'
                        style = {style} 
                    >
                        <div className = "pullrefresh__msg" >
                            <i className = "pullrefresh__icon" ></i> 
                        </div> 
                    </div> 
                </div>
            </Modal>
        )
    }
}