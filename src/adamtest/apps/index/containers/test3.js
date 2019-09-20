import React, { useState, useEffect } from 'react';

function App() {
    const [isOn, setIsOn] = useState(false);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let interval;

        if (isOn) {
            interval = setInterval(
                () => setTimer(timer => timer + 1),
                1000,
            );
        }

        return () => clearInterval(interval);
    }, [isOn]);

    const onReset = () => {
        setTimer(0);
        setIsOn(false);
    };

    return (
        <div>
            {timer}

            {!isOn && (
                <button type="button" onClick={() => setIsOn(true)}>
                    Start
                </button>
            )}

            {isOn && (
                <button type="button" onClick={() => setIsOn(false)}>
                    Stop
                </button>
            )}
            <button type="button" onClick={() => {onReset()}} disabled={timer === 0}>
                reset
            </button>
        </div>
    );
}

export default App;
