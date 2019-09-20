import React, {useState, useEffect, useLayoutEffect} from 'react';

function useAppData() {
    const [renderText, setText] = useState('');

    const [isGo, setIsGo] = useState(false);

    const [item, setItem] = useState([]);

    useLayoutEffect(() => {
        const a = document.body.offsetWidth;
        console.log('start useLayoutEffect', a);
        setText(a);
        return () => {
            console.log('end useLayoutEffect');
        };
    });

    // 自动计时
    useEffect(() => {
        let interval;
        console.log('我要创建任务');
        if (isGo) {
            interval = setInterval(
                () => {
                    return setItem((item) => [...item, `这是第${item.length + 1}条text哦`]);
                },
                3000,
            );
        }

        return () => {
            // componentWillUnmount

            console.log(`销毁了${isGo}`);
            return clearInterval(interval);
        };
    }, [isGo]);

    useEffect(() => {
        // componentDidMount
        document.title = `${item.length} items`;
        console.log('我要修改title');
    });

    const onReset = () => {
        setItem([]);
    };
    return {
        data: {item, renderText, isGo},
        methods: {setIsGo, onReset}
    };
}

function UseStateApp() {
    const {data, methods} = useAppData();
    console.log('render', data.isGo);
    return (
        <div>
            {
                data.item.map((text, index) => {
                    return <div key={`p${index}`}>{text}</div>;
                })
            }

            <button type="button" onClick={() => methods.setIsGo(true)}>
                Start
            </button>

            <button type="button" onClick={() => methods.setIsGo(false)}>
                Stop
            </button>
            <button type="button" onClick={() => {
                methods.onReset();
            }}>
                reset
            </button>


            <button type="button" onClick={() => {
                window.location.href = '/useContext';
            }}>
                goContext
            </button>
            {data.renderText}
        </div>
    );
}

export default UseStateApp;
