import React from 'react';
import './styles/index.less';

const FailedView = ({ onClick, handleClick, tip, children }) => (
    <div className="failed">
        <i className="failed-icon"></i>
        <span className="tip" onClick={onClick} ref={handleClick}>{tip || children}</span>
    </div>
);

export default FailedView;