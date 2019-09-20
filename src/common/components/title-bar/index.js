import React from 'react';
import PropTypes from 'prop-types';

import { close as appClose } from '$common/services/app-bridge-api'

import './styles/index.less';

export default class TitleBar extends React.Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    prefixHandle: () => appClose()
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    prefixHandle: PropTypes.func
  }

  render() {
    const { title = "", prefixHandle, styles = {}, styleClass = "" } = this.props;
    const { titleCom, prefixCom, suffixCom } = this.props;
    const { titleStyle = {}, prefixStyle = {}, suffixStyle = {} } = this.props;
    const { titleClass = "", prefixClass = "", suffixClass = "" } = this.props;


    return (
      <div className={`title-bar__component ${styleClass}`} style={styles}>
        <div className="bar-wrapper">
          <div className="prefix" onClick = { prefixHandle }>
            { prefixCom 
              ? prefixCom
              : <i className={`prefix__icon ${prefixClass}`} style={prefixStyle}></i>
            }
          </div>
          {
            titleCom 
            ? titleCom
            : <div className={`title ${titleClass}`} style={titleStyle}>{ title }</div>
          }
          <div className="suffix">
            {
              suffixCom 
              ? suffixCom
              : <i className={`suffix__icon ${suffixClass}`} style={suffixStyle}></i>
            }
          </div>
        </div>
      </div>
    )
  }
}