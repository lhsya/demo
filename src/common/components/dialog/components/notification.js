import React from 'react'
import Dialog from './dialog'
import ReactDOM from 'react-dom'

function createNotification() {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const ref = React.createRef()
    ReactDOM.render(<Dialog ref={ref} />, div)
    return {
        addNotice(notice) {
            return ref.current.addDialog(notice)
        },
        removeNotice(){
            return ref.current.removeDialog()
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        }
    }
}

export default createNotification()