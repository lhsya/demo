import './styles/index.less';

import React, { PureComponent as Component } from 'react';
import { render } from 'react-dom';
import Container from '../components/container';

const defaultMessage = '未提供信息';

class MessageBox extends Component {
    constructor(props){
        super(props);

        this.state = {
            showing: true,
            message: defaultMessage
        }
    }

    static getDerivedStateFromProps(props, state){
        return {...state, message: props.message};
    }

    componentDidMount(){
        
    }

    render(){
        const { showing, message } = this.state;
        return (
            <Container {...{showing}}>
                {
                    this.props.children || (
                        <div className="message-box">
                            <span>{message}</span>
                        </div>
                    )
                }
            </Container>
        );
    }

    hideSelf = () => {
        this.shouldComponentUpdate({showing: false});
    }

    handleConfirm = () => {
        this.hideSelf();
        try{
            this.props.confirmCallback();
        }catch(e){}
    }

    handleClose = () => {
        this.hideSelf();
        try{
            this.props.closeCallback();
        }catch(e){}
    }
}

const showMessageBox = (message, duration, tpl) => {
    if(message instanceof Object){
        tpl = message.tpl
        duration = message.duration;
        message = message.message;  // at last
    }
    
    render((
        <MessageBox {...{message, duration}}>{tpl}</MessageBox>
    ), document.createElement('div'));
};
export { showMessageBox };
export default MessageBox;
