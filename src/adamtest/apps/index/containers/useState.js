import React, {useState} from 'react';

const initFunc = () => {
    const result = ['init'];
    return result;
};

function useAppData() {

    const [item, setItem] = useState(true);

    const changeFunc = (type) => {
        return () => {
            setItem([...item, `这是第${item.length + 1}条text哦`]);
            // if (type === 'add') {
            //     setItem([...item, `这是第${item.length + 1}条text哦`]);
            // } else {
            //     item.pop();
            //     setItem([...item]);
            // }
            // if (item.length > 10) {
            //     setItem([...item, `这是第10+条text哦`]);
            // }
        };
    };

    return {
        data: {item},
        methods: {changeFunc}
    };
}

function UseStateApp() {

    const {data, methods} = useAppData();
    return (
        <div className="demoPage">
            <div>
                {
                    data.item.map((text, index) => {
                        return <div key={`p${index}`}>{text}</div>;
                    })
                }
            </div>
            <div>
                <button type="button" onClick={methods.changeFunc('add')}>
                    add
                </button>
                <button type="button" onClick={methods.changeFunc('sub')} style={{marginLeft: '20px'}}>
                    sub
                </button>







                <button onClick={() => {
                    window.location.href = '/useReducer';
                }} style={{marginLeft: '20px'}}>
                    goUseReducer
                </button>

            </div>
        </div>
    );
}

export default UseStateApp;
