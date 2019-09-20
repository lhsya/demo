import React, {useRef} from 'react';

function TextInputWithFocusButton() {
    const inputEl = useRef();
    console.log(inputEl, 'inputEl.current');        // undefined
    const onButtonClick = () => {
        // `current` 指向已挂载到 DOM 上的文本输入元素
        console.log(inputEl, 'inputEl.current');
        inputEl.current.focus();
    };


    return (
        <div>
            <input ref={inputEl} type="text"/>

            <button onClick={onButtonClick}>Click focus</button>

            <button type="button" onClick={() => {
                window.location.href = '/useImperativeHandle';
            }}>
                goImperative
            </button>
        </div>
    );
}

export default TextInputWithFocusButton;
