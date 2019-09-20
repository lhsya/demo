import React from 'react';
import Base from '../base/index';

let zIndex = 99;

//适用于相对窗口定位（fixed）的弹出层
const defaultStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    'z-Index': ++zIndex
};

const Container = (props) => {
    const _props = {styles: defaultStyles, ...props};
    delete _props.showing;
    delete _props.children;
    return props.showing ? (
        <Base {..._props}>{props.children}</Base>
    ) : null;
};

export default Container;


