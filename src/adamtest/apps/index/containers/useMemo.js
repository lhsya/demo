import React, {useState, useMemo} from 'react';


function WithoutMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');

    // const expensive = () => {
    //     console.log('我走了一次');
    //     let result = 1;
    //     for (let i = 1; i <= count; i++) {
    //         result *= i;
    //     }
    //     return result;
    // };

    const expensive = useMemo(() => {
        console.log('我走了一次');
        let sum = 1;
        for (let i = 1; i < count; i++) {
            sum *= i;
        }
        return sum;
    }, [count]);

    return (
        <div>
            <div>count:{count} - expensive:{expensive}</div>
            {val}
            <div>
                <button onClick={() => setCount(count + 1)}>add</button>
                <input value={val} onChange={event => setValue(event.target.value)}/>
            </div>
            <button type="button" onClick={() => {
                window.location.href = '/useCallBack';
            }}>
                goCallBack
            </button>
        </div>);
}

export default WithoutMemo;
