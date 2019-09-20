import React from 'react';
import ActivityIntroduction from "../components/ActivityIntroduction";
import {updatePositionCategoriesFunc} from "../actions";
import {connect} from 'react-redux'
import Api from "../services";

class Home extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            demoTest: this.props.demoTest,
            chuandi: this.props.chuandi

        }
    }

    componentDidMount() {
        // this.doUpdateState();
        // location.reload();
    }

    componentWillReceiveProps(next) {
        this.setState({
            demoTest: next.demoTest
        })
    }


    doUpdateState = () => {
        Api.testApi().then((res) => {
            console.log(res, 'res');
        })
    };


    changeText() {
        const {demoTest} = this.state;
        if (demoTest !== 'reducerTest111') {
            const demoChange = {
                demoTest: 'reducerTest111'
            };
            this.props.updatePositionCategoriesFunc({...demoChange});
        } else {
            const demoChange = {
                demoTest: 'change'
            };
            this.props.updatePositionCategoriesFunc({...demoChange});
        }
    };

    goTest() {
        window.location.href = '/test1';
    }

    render() {
        return (
            <div className="activity-introduction">
                <div className="demoTest">{this.props.demoTest}</div>
                <button
                    onClick={() => {
                        this.changeText();
                    }}
                    className="changeBtn"
                >
                    change
                </button>
                <button
                    onClick={() => {
                        this.goTest();
                    }}
                    className="changeBtn"
                >
                    111
                </button>
                <button
                    onClick={() => {
                        window.location.href = '/test2';
                    }}
                    className="changeBtn"
                >
                    222
                </button>
                <button
                    onClick={() => {
                        window.location.href = '/test3';
                    }}
                    className="changeBtn"
                >
                    333
                </button>
                <div>
                    {this.props.chuandi}
                </div>
                {
                    this.state.demoTest !== 'reducerTest111' ? <ActivityIntroduction closeHandler={() => {
                        console.log('ActivityIntroduction')
                    }}/> : null
                }

            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        demoTest: state.reducerTest.demoTest
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    updatePositionCategoriesFunc: (data) => dispatch(updatePositionCategoriesFunc(data))
});


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
