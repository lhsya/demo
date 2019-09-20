
import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import LoadingView from '../loading-view/index';
import FailedView from '../failed-view/index';

import 'intersection-observer';

class IntersectionObserverLoading extends Component {
    constructor(props){
        super(props);

        this.id = '__loading__';
        this.layout = null;
    }

    componentDidMount(){
      this.registerObserver();
    }

    handleClick(){
      const { failedHandle } = this.props;
      failedHandle();
    }

    registerObserver() {
        const { successHandle = () => {} } = this.props;
        const { intersectionOptions = {} } = this.props;
        const options = {
            root: null,
            rootMargin: '0%',
            threshold: 0,
            target: this.layout,
            ...intersectionOptions
        }
        let { getRootElement, getTargetElement } = options;
        if (getRootElement) {
            options.root = getRootElement();
        }
        if (getTargetElement) {
            options.target = getTargetElement();
        }
        const instance = new IntersectionObserver((entries) => {
            const entry = entries.find(entry => entry.isIntersecting);
            if (entry) {
              successHandle();
            }
        }, options);

        instance.observe(options.target);
    }

    setLoadingRef(loadingDom){
        this.layout = loadingDom;
    }

    render(){
        const {
          loadingTip = '加载中，请耐心等待',
          failedTip = '加载失败，点击重试',
          showing,
          isActionFailed,
          styles
        } = this.props;

        const loadingContent = isActionFailed
          ? <FailedView onClick={this.handleClick}>{failedTip}</FailedView>
          :  <LoadingView>{loadingTip}</LoadingView>

        return (
            showing
            ? <div
                ref={this.setLoadingRef}
                style={styles}
              >
                {loadingContent}
            </div>
            : null
        );
    }
}

IntersectionObserverLoading.propTypes = {
    showing: PropTypes.bool,
    successHandle: PropTypes.func,    //a Promise instance
    isActionFailed: PropTypes.bool,
    failedHandle: PropTypes.func,
    styles: PropTypes.object,
};

export default IntersectionObserverLoading;

