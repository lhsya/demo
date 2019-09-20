import ChildContainer from '../components/ChildContainer';
import React, {createContext} from 'react';

const contextObj1 = {
    test: '这是从context1里边获取到的值',
    color: 'red',
};
const contextObj2 = {
    test: '这是从context2里边获取到的值',
    color: 'pink'
};
export const MyContext = createContext();

function UseContext() {

    return (
        <div>
            <MyContext.Provider value={contextObj1}>
                <ChildContainer/>
            </MyContext.Provider>
            <MyContext.Provider value={contextObj2}>
                <ChildContainer/>
            </MyContext.Provider>







            <button type="button" onClick={() => {
                window.location.href = '/useRef';
            }}>
                goRef
            </button>
        </div>
    );

}

export default UseContext;
