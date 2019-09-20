import React, {useState, useEffect} from 'react';
import moment from 'moment';

// 钩子函数
function useStatusNumber(num) {
    // isValid的值的改变只能在这个函数里边进行
    const [validNum, setValidNum] = useState(num || 0);

    function handleStatusChange(num) {
        setValidNum(num);
    }

    return {validNum, handleStatusChange};
}

function useSecond() {
    const {validNum, handleStatusChange} = useStatusNumber();  // 2
    useEffect(() => {
        handleStatusChange(2);
    }, []);
    return {validNum, handleStatusChange};
}

function useButton() {
    const [isShowWhat, setCount] = useState(true);
    const third = useStatusNumber(3);   // 3
    const secondR = useSecond();

    // 相当于只在componentDidMount的时候执行，适用于接口获取等
    useEffect(() => {
        // 使用浏览器的 API 更新页面标题
        document.title = third.validNum;
        console.log('componentDid useButton');
    }, []);

    function handle() {
        setCount(!isShowWhat);
        const num = third.validNum + 1;
        third.handleStatusChange(num);
        if (num === 6) {
            secondR.handleStatusChange(5);
        }
    }

    // function RenderSecond() {
    //     // 纯ui组建，没有数据更新，直接展示dom
    //     const data = {text: 'second2.validNum: ', validNum: secondR.validNum};
    //     return <RenderComponent {...data}/>;
    // }

    return {isShowWhat, third, handle};
}

function useShowTime() {
    const [time, setTime] = useState(null);
    useEffect(() => {
        const s = window.setInterval(() => {
            setTime(moment().format('YYYY-MM-DD HH:mm:ss'));
        }, 1000);
        return () => {
            clearInterval(s);
        };
    });
    return {time};
}

// 渲染组件函数
function RenderComponent(data) {
    // 纯ui组建，没有数据更新，直接展示dom
    return (
        <div>
            <div>{data.text} {data.validNum}</div>
            <div>
                {data.time ? data.time : ''}
            </div>
        </div>);
}

function Counter({initialCount, count, setCount}) {
    return (
        <>
            Count: {count}
            <button onClick={() => setCount(initialCount)}>Reset</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
        </>
    );
}

function Counters({initialCount, count, setCount}) {
    return (
        <>
            Count: {count}
            <button onClick={() => setCount(initialCount)}>Reset</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
        </>
    );
}

function RenderFirst() {
    const first = useStatusNumber(1);   // 1
    const {time} = useShowTime();
    // 纯ui组建，没有数据更新，直接展示dom
    const data = {text: 'first1.validNum: ', validNum: first.validNum, time};
    return <RenderComponent {...data}/>;
}

function RenderSecond() {
    const secondR = useSecond();
    // 纯ui组建，没有数据更新，直接展示dom
    const data = {text: 'second2.validNum: ', validNum: secondR.validNum};
    return <RenderComponent {...data}/>;
}

function ChangeRender() {
    const {isShowWhat, third, handle} = useButton();
    const [count, setCount] = useState(5);

    const data = {text: 'third3.isValid: ', validNum: third.validNum};
    // 纯ui组建，没有数据更新，直接展示dom
    return (
        <div>
            {
                isShowWhat ? <RenderFirst/> : <RenderSecond/>
            }
            <button onClick={() => {
                // 点击之后，因为发生了setCount及handleStatusChange数据的变化导致组件的重绘
                handle();
            }}>
                点击
            </button>
            <RenderComponent {...data}/>
            <Counter initialCount={5} count={count} setCount={setCount}/>
            <Counters initialCount={3} count={count} setCount={setCount}/>
        </div>
    );
}

function testDemo() {
    // 纯ui组建，没有数据更新，直接展示dom
    return (
        <>
            <ChangeRender/>
        </>
    );

}

export default testDemo;
