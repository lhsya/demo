import React, {useDebugValue, useState} from 'react';

function useEditHook() {
    const [isShowText, setIsShowText] = useState(false);
    useDebugValue(isShowText ? 'true IsShowText 1' : 'false IsNot ShowText 0');
    return {isShowText, setIsShowText};
}

function UseDebugValue() {
    const {isShowText, setIsShowText} = useEditHook();
    return (
        <div>
            {
                isShowText ? 'ShowMe' : 'IsNotShow'
            }
            <button onClick={() => {
                setIsShowText(!isShowText);
            }}>
                click
            </button>
            <div>
                <button onClick={() => {
                    window.location.href = '/customHook';
                }}>
                    Go customHook
                </button>
            </div>
        </div>

    );
}

export default UseDebugValue;

