import React from 'react';
import {connect} from './connect';

class ChildComponent extends React.Component {

    render() {
        console.log(this.props);
        return (
            <div>
                ChildComponent:{this.props.store.demo}
            </div>
        );
    }
}

const mapStateToProps = (data) => {
    return {
        store: data
    };
};
export default connect(mapStateToProps)(ChildComponent);
