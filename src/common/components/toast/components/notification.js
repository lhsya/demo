import React from 'react'
import Notice from './notice'
import ReactDOM from 'react-dom'

class Notification extends React.Component {

    constructor(props) {
        super(props);
        this.state = { notices: [] }
        this.removeNotice = this.removeNotice.bind(this);
    }

    getNoticeKey() {
        const { notices } = this.state;
        return `notice-${new Date().getTime()}-${notices.length}`;
    }

    addNotice(notice) {
        const { notices } = this.state
        notice.key = this.getNoticeKey()
        if (notices.every(item => item.key !== notice.key)) {
            if (notice.length > 0 && notices[notice.length - 1].type === 'loading') {
                notices.push(notice)
                setTimeout(() => { this.setState({ notices }) }, this.transitionTime)
            } else {
                notices.push(notice)
                this.setState({ notices })
            }
            if (notice.duration > 0) {
                setTimeout(() => {
                    this.removeNotice(notice.key)
                }, notice.duration)
            }
        }
        return () => { this.removeNotice(notice.key) }
    }


    removeNotice(key) {
        const { notices } = this.state
        this.setState({
            notices: notices.filter((notice) => {
                if (notice.key === key) {
                    if (notice.onClose) setTimeout(notice.onClose, this.transitionTime)
                    return false
                }
                return true
            })
        })
    }

    render() {
        const { notices } = this.state
        return (
            <div className="notifications">
                    {
                        notices.map(notice => (
                            <Notice key={notice.key} {...notice} />
                        ))
                    }
            </div>
        )
    }
}


function createNotification() {
    const div = document.createElement('div')
    document.body.appendChild(div)
    const ref = React.createRef()
    ReactDOM.render(<Notification ref={ref} />, div)
    return {
        addNotice(notice) {
            return ref.current.addNotice(notice)
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        }
    }
}

export default createNotification()