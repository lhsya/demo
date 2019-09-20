import React, {useContext} from 'react';
import {MyContext} from '../containers/useContext';

const ChildContainer = () => {
    const contextData = useContext(MyContext);
    return (
        <div style={{color:contextData.color}}>
            {contextData.test}
            {contextData.color}
        </div>
    );
};

export default ChildContainer;
