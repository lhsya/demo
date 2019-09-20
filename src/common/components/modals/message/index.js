import './styles/index.less';

import React, { PureComponent as Component } from 'react';
import { render } from 'react-dom';
import Container from '../components/container';

const DEFAULT_MESSAGE = '未提供信息'

class Message extends Component {
    constructor(props){
        super(props);

        this.defaultMessage = DEFAULT_MESSAGE;
        this.state = {
            showing: true,
            message: DEFAULT_MESSAGE
        }
    }

    static getDerivedStateFromProps(props, state){
        return {...state, message: props.message || state.message};
    }

    componentDidMount(){
        try{
            this.props.didMountCallback(this);
        }catch(e){}
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
}

const showMessage = (message, duration = 1300, tpl) => {
    if(message instanceof Object){
        tpl = message.tpl
        duration = message.duration || duration;
        message = message.message;  // at last
    }

    const didMountCallback = (_this) => {
        setTimeout(() => {
            _this.setState({
                showing: false,
                message: _this.defaultMessage
            });
        }, duration);
    };

    render((
        <Message {...{message, didMountCallback}}>{tpl}</Message>
    ), document.createElement('div'));
};

export { Message };
export default showMessage;
