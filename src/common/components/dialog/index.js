import notificationDOM from './components/notification';
import './index.less';

let notification
const notice = (params) => {
    if (!notification) notification = notificationDOM
    return notification.addNotice(params)
}

export default {
    show(content, duration, onClose) {
        return notice({content, duration, onClose})
    },
    hide(){
        if(notification){
            return notification.removeNotice()
        }
    }
}