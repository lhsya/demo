import React, {forwardRef, createRef, useImperativeHandle, useRef} from 'react';

function Example(props, ref) {
    const inputRef = useRef();
    const testFunc = () => {
        console.log('testFunc');
    };
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        },
        getInputValue: () => {
            console.log(inputRef.current.value, 'getInputValue');
        },
        testFunc: testFunc
    }));
    return <input ref={inputRef}/>;
}

const ChildComponent = forwardRef(Example);

function UseImperativeHandle() {
    const examplesRef = createRef();
    return (
        <>
            <ChildComponent ref={examplesRef}/>

            <button onClick={() => {
                console.log(examplesRef, 'examplesRef');
                examplesRef.current.focus();
                examplesRef.current.getInputValue();
                examplesRef.current.testFunc();
            }}>Click
            </button>


            <button type="button" onClick={() => {
                window.location.href = '/useMemo';
            }}>
                goMemo
            </button>
        </>);
}

export default UseImperativeHandle;
