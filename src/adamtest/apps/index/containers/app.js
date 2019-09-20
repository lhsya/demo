import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Test1 from './test1';
import Test2 from './test2';
import Test3 from './test3';
import Home from './home';
import UseStateApp from './useState';
import UseEffect from './useEffect';
import UseContext from './useContext';
import UseReducer from './useReducer';
import UseRef from './useRef';
import UseMemo from './useMemo';
import UseCallback from './useCallback';
import UseImperativeHandle from './useImperativeHandle';
import UseDebugValue from './useDebugValue';
import CustomHook from './customHook';
import ReduxDemo from './redux/App';

export default class App extends React.Component {


    render() {
        return (
            <BrowserRouter>
                <div className="index-mian">
                    <Switch>
                        <Route path='/home' component={Home}/>
                        <Route path='/test1' component={Test1}/>
                        <Route path='/test2' component={Test2}/>
                        <Route path='/test3' component={Test3}/>
                        <Route path='/useState' component={UseStateApp}/>
                        <Route path='/useEffect' component={UseEffect}/>
                        <Route path='/useContext' component={UseContext}/>
                        <Route path='/useReducer' component={UseReducer}/>
                        <Route path='/useRef' component={UseRef}/>
                        <Route path='/useMemo' component={UseMemo}/>
                        <Route path='/useCallBack' component={UseCallback}/>
                        <Route path='/useImperativeHandle' component={UseImperativeHandle}/>
                        <Route path='/useDebugValue' component={UseDebugValue}/>
                        <Route path='/customHook' component={CustomHook}/>
                        <Route path='/redux' component={ReduxDemo}/>
                        <Route path="/" render={() => (<Redirect to="/useState"/>)}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}
