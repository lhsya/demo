import React from 'react';
import PropTypes from 'prop-types';

export const connect = (mapStateToProps) => (WrappedComponent) => {
    class Connect extends React.Component {
        static contextTypes = {
            store: PropTypes.object
        };

        constructor(props) {
            super(props);
            this.state = {allProps: {}};
        }

        componentWillMount() {
            const {store} = this.context;
            this._updateProps();
        }

        _updateProps() {
            const {store} = this.context;
            let stateProps = mapStateToProps(store, this.props);
            this.setState({
                allProps: {
                    ...stateProps,
                    ...this.props
                }
            });
        }

        render() {
            return <WrappedComponent {...this.state.allProps} />;
        }
    }

    return Connect;
};
