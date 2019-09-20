import React from 'react';
import Provider from './Provider';
import ChildComponent from './ChildComponent';

export default class ReduxDemo extends React.Component {
    render() {
        const data = {demo: 'ReduxDemo'};
        return (
            <Provider store={data}>
                <ChildComponent child="child"/>
            </Provider>
        );
    }
}
