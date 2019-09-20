import React from 'react';

export default class Test1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first: {
                validNum: 1
            },
            second: {
                validNum: 2
            },
            third: {
                validNum: 0
            }
        }
    }

    getStatusString() {
        const {isValid} = this.state;
        return isValid ? "valid" : "invalid";
    }

    RenderFirst() {
        return <div>first.validNum: {first.validNum}</div>;
    }

    RenderSecond(data) {
        const {isValid} = this.state;
        return (
            <li style={{color: isValid ? "pink" : "yellow"}}>{data}</li>
        );
    }

    handle() {
        const {isShowWhat, isValid} = this.state;
        this.setState({
            isShowWhat: !isShowWhat,
            isValid: !isValid
        });
    }

    render() {
        const {isShowWhat, isValid} = this.state;
        const data = 'adam';
        return (
            <div>
                {
                    isShowWhat ? this.renderListStatus() : this.renderListName(data)
                }
                <button
                    onClick={() => {
                        this.handle()
                    }}
                >
                    点击222
                    {isValid + ''}
                </button>
            </div>
        );
    }
}
