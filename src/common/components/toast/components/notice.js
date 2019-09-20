import React, { Component } from 'react'

class Notice extends Component {
    render() {
        const { type, content } = this.props
        return (
            <div className={`toast-notice ${type}`}>
               <div style={{WebkitBoxOrient: "vertical"}}>{content}</div> 
            </div>
        )
    }
}

export default Notice