import React, {useReducer} from 'react';


function init(initData) {
    console.log('init方法');
    return {...initData, test: '我是在init方法中添加的哦'};
}

function reducer(state, action) {
    switch (action.type) {
        case 'add':
            return {...state, count: state.count + 1};
        case 'sub':
            return {count: state.count - 1};
        case 'reset':
            return init(action.payload);
        default:
            throw new Error();
    }
}

function Counter({initialCount}) {

    const [state, dispatch] = useReducer(reducer, initialCount, init);
    console.log(state, 'state');
    return (
        <div>
            <div>
                {state.count}
            </div>
            <button onClick={() => dispatch({type: 'add'})}>add</button>
            <button onClick={() => dispatch({type: 'sub'})}>sub</button>
            <button
                onClick={() => dispatch({type: 'reset', payload: initialCount})}>
                Reset
            </button>
            <button type="button" onClick={() => {
                window.location.href = '/useEffect';
            }}>
                goEffect
            </button>
        </div>
    );
}

function UseReducerDemo() {
    const initialCount = {count: 1};
    return (
        <Counter initialCount={initialCount}/>
    );

}

export default UseReducerDemo;
