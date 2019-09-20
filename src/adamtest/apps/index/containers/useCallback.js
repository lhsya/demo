import React, {useState, useCallback, useEffect} from 'react';

function Parent() {
    const [panCount, setCount] = useState(1);
    const [val, setVal] = useState('');

    const func = useCallback(() => {
        return panCount + 1;
    },[panCount]);

    // const func = () => {
    //     return panCount + 1;
    // };

    return (
        <div>
            <div>Parent:{panCount}</div>
            <Child func={func}/>
            <div>{val}</div>
            <div>
                <button onClick={() => setCount(panCount + 1)}>add</button>
                <input value={val} onChange={event => setVal(event.target.value)}/>
            </div>


            ===============================
            <button type="button" onClick={() => {
                window.location.href = '/useDebugValue';
            }}>
                goUseDebugValue
            </button>
        </div>);
}


function Child({func}) {
    const [childCount, setCount] = useState(2);
    useEffect(() => {
        console.log('进了子组件的effect');
        const result = func();
        setCount(result);
    }, [func]);
    //, [func]
    return <div>
        child:{childCount}
    </div>;
}

export default Parent;
