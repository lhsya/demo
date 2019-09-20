import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../../../components/container/index';
import LoadingView from '../loading-view/index';
import FailedView from '../failed-view/index';

class FixedLoading extends Component {
    constructor(props){
        super(props);

        this.state = {
            showing: true,
            isPromiseRejected: false,
            promise: Promise.resolve()
        }

        this.id = '__loading__';
    }

    static getDerivedStateFromProps(props, state){
        const { showing, promise, isActionFailed } = props;
        const _state = {...state, promise};

        if(showing !== undefined){
            _state.showing = Boolean(showing);
        }
        if(promise instanceof Promise && state.promise !== promise){
            _state.showing = true;
        }
        if(isActionFailed !== undefined){
            _state.isPromiseRejected = isActionFailed;
        }
        return _state;
    }

    handlePromise(){
        try{
            this.props.promise.then(() => {
                this.setState({showing: false});
            }).catch(() => {
                this.setState({status: -1});
            });
        }catch(e){}
    }

    componentDidMount(){
        this.handlePromise();
    }

    componentDidUpdate(){
        this.handlePromise();
    }

    handleClick(e){
        try{
            e.addEventListener('click', this.props.failedHandler);
        }catch(e){}
    }

    render(){
        const { loadingTip = '加载中，请耐心等待', failedTip = '加载失败，点击重试' } = this.props;
        const props = {...this.props};
        props.id = props.id || this.id;
        props.styles = props.styles || {};
        [
            'showing',
            'promise',
            'status',
            'failedHandler',
            'isActionFailed',
        ].forEach(n => delete props[n]);

        const loadingContent = !this.state.isPromiseRejected ? (
            <LoadingView>{loadingTip}</LoadingView>
        ) : (
            <FailedView handleClick={this.handleClick}>{failedTip}</FailedView>
        );

        return (
            <Container
                showing={this.state.showing}
                {...props}
              >
                {loadingContent}
            </Container>
        );
    }
}

FixedLoading.propTypes = {
    showing: PropTypes.bool,
    promise: PropTypes.object,    //a Promise instance
    isActionFailed: PropTypes.bool,
    failedHandler: PropTypes.func,
    styles: PropTypes.object,
};

export default FixedLoading;
