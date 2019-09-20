import React from 'react';
import './styles/index.less';

const LoadingView = ({ tip, children }) => (
    <div className="loading">
      <i className="loading-circle"></i>
      <span>{tip || children}</span>
    </div>
);

export default LoadingView;