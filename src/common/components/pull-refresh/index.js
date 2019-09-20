import React from 'react';
import PropTypes from 'prop-types'

import Modal from '$common/components/modals/components/base';
import PullRefreshCom from './components/PullRefresh';

class PullRefresh extends React.Component {
    constructor(props) {
        super(props);
    }
    
    static defaultProps = {
        showing: true,
        id: 'pull-refresh',
        styles: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 'auto',
            'z-index': 9999
        }
    }

    static propTypes = {
        showing: PropTypes.bool,
        id: PropTypes.string,
        styles: PropTypes.object
    }

    render() {
        const {
            showing,
            id,
            styles
        } = this.props;
        const newProps = {
            showing,
            id,
            insertWay: 'prepend'
        };
        const newStyles = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 'auto',
            'z-index': 99,
            ...styles,
        }
        return showing ? (
            < Modal styles = {newStyles} {...newProps} >
                <PullRefreshCom {...this.props}/> 
            </Modal>
        ) : null;
    }
}

export default PullRefresh;