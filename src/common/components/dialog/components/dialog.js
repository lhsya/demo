import React from 'react'
import styles from '../index.less'

class Dialog extends React.Component{
  constructor (props) {
      super(props);
      this.transitionTime = 300
      this.state = { notices: {} }
      this.removeDialog = this.removeDialog.bind(this)
  }

  addDialog (notice) {
      this.setState({ notices: notice })
      return () => { this.removeDialog() }
  }

  removeDialog (key) {
      this.setState({
          notices: {}
      })
  }

  render(){
    const { notices } = this.state
    if(notices.content){
    return(
      <div className="dialog">
        <div className="dialog-bg" onClick={()=>{ this.removeDialog()}}></div>
        <div className="dialog-content" >
        <div className="dialog-body" >
          {notices.content.title && <div className="dialog-title" >{notices.content.title}</div>}
          {notices.content.text && <div className="dialog-text" >{notices.content.text}</div>}
        </div>
          <div className="dialog-btn-content">
            <button className={notices.content.cancelText? "dialog-btn": "dialog-btn-hidden"} onClick={()=>{ notices.content.cancalFunc ? notices.content.cancalFunc() :this.removeDialog()}}>
              {notices.content.cancelText}
            </button>
            <button className={notices.content.okText? "dialog-btn success": "dialog-btn-hidden"} onClick={()=>{ notices.content.okFunc()}}>
              {notices.content.okText}
            </button>
          </div>
        </div>
      </div>
      
    )
  }else{
    return(
      <div></div>
    )
  }
  }
}

export default Dialog