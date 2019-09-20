import React, {useState, useEffect} from 'react';

function useListenWindow() {
    let [heightSize, setHeightSize] = useState(window.innerHeight);
    function handleResize() {
        setHeightSize(window.innerHeight);
    }
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return heightSize;
}

function CustomHook() {
    const heightSize = useListenWindow();

    return (
        <div>
            heightSize: {heightSize}
        </div>
    );
}

export default CustomHook;
