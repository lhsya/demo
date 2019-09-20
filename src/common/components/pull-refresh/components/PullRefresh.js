import React from 'react';
import PropTypes from 'prop-types';

import Gesture from '$common/services/gesture';

import '../styles/index.less';


const STATUS = {
  init: 'init',
  pull: 'pull',
  pulldown: 'pulldown',
  refreshing: 'refreshing',
  refreshed: 'refreshed'
};

export default class PullRefreshCom extends React.Component {
  constructor(props) {
    super(props);
    const { maxPullRefreshDistance, height } = props;
    this.triggerPandown = false; // 是否触发pandown事件。作用：在panend事件中可以确定是否触发了pandown
    this.startPositionY = 0;
    this.threshold = 10;
    this.state = {
      status: STATUS.init,
      pullHeight: 0, // 当前下拉高度
      transform: -maxPullRefreshDistance, // 初始位置，改变该值影响显示位置
      height
    };
  }

  static defaultProps = {
    duration: 50,
    maxPullRefreshDistance: Math.floor(window.screen.availHeight / 3.5),
    height: 100,
    getScrollElement: () => {},
    refreshFunc: () => {
      return new Promise((resolve, reject) => {
        try {
          location.reload(true);
          resolve();
        } catch(err) {
          err instanceof Error ? reject(err) : reject(new Error(err));
        }
      })
    }
  }

  static propTypes = {
    duration: PropTypes.number,
    maxPullRefreshDistance: PropTypes.number,
    height: PropTypes.number,
    refreshFunc: PropTypes.func
  }

  componentDidMount() {
    const element = document.documentElement;
    const gesture = Gesture.getInstance();
    gesture.addElement(element)
    .on('panstart', (e) => {
      this.panstartHandle(e);
    })
    .on('pandown', (e) => {
      this.pandownHandle(e);
    })
    .on('panend', (e) => {
      this.panendHandle(e);
    })
  }

  panstartHandle = (e) => {
    if (!this.canRefresh()) return;
    this.startPositionY = 0;
    if (e.center && e.center.y) {
      this.startPositionY = e.center.y;
    }
  }


  pandownHandle = (e) => {
    if (!this.canRefresh() || !this.startPositionY) return;

    const { status } = this.state;
    const { maxPullRefreshDistance } = this.props;
    let distance = e.center.y - this.startPositionY;

    if (
      status === STATUS.pulldown 
      || distance < this.threshold
    ) return;

    this.triggerPandown = true;

    distance = distance >= maxPullRefreshDistance ? maxPullRefreshDistance : distance;
    this.setState({
      status: distance >= maxPullRefreshDistance ? STATUS.pulldown : STATUS.pull,
      pullHeight: distance,
      transform: distance - maxPullRefreshDistance
    });
  }

  panendHandle = (e) => {
    if (!this.canRefresh() || !this.triggerPandown) return;
    this.triggerPandown = false;
    const { status, pullHeight } = this.state;
    
    // if (this.isNotAtTop()) {
    //   this.initPullRefresh();
    //   return;
    // } 
    if (status !== STATUS.pulldown) {
      this.pullTransition({
        end: pullHeight
      });
      this.setState({
        pullHeight: 0
      });

      return;
    };

    this.setState({
      status: STATUS.refreshing
    });

    setTimeout(() => {
      this.props.refreshFunc().then(() => {
        this.pullTransition();
        this.setState({
          pullHeight: 0
        });
      })
    }, 200);
  }

  initPullRefresh() {
    const { maxPullRefreshDistance, height } = this.props;
    this.setState({
      status: STATUS.init,
      pullHeight: 0, // 当前下拉高度
      transform: -maxPullRefreshDistance, // 初始位置，改变该值影响显示位置
      height
    });
  }

  scrollTop() {
    const scrollElement = this.props.getScrollElement();
    if (scrollElement) {
      return scrollElement.scrollTop;
    }
    return window.pageYOffset
      || document.documentElement.scrollTop 
      || document.body.scrollTop
      || 0;
  }

  isNotAtTop() {
    return this.scrollTop() > 0;
  }

  canRefresh() {
    const { refreshFunc } = this.props;
    const { status } = this.state;
    
    return refreshFunc 
      && STATUS.refreshing !== status 
      && !this.isNotAtTop();
  }

  pullTransition = (opt = {}) => {
    let { maxPullRefreshDistance, duration } = this.props;
    const { pullHeight } = this.state;
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
      option.currentTime ++;
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
    return c / 2*((t -= 2) * t * t + 2) + b;      
  }

  render() {
    const { status, height, transform } = this.state;
    
    const style = {
      height: `${height}px`,
      transform: `translateY(${transform}px)`,
      WebkitTransform: `translateY(${transform}px)`
    };

    return (
      <div
        ref = {(el) => { this.el = el; }}
        className = {`pullrefresh ${status}`}
      >
        <div className='pullrefresh__header' style={style}>
          <div className="pullrefresh__msg">
            <i className="pullrefresh__icon">
            </i>
          </div>
        </div>
      </div>
    )
  }
}