import React from 'react'
import TestOO from './testOO';


const App = () => (
    <div>
       测试一下呀
        <TestOO visible={true} chuandi="chuandi" closeHandler={() => {console.log('closeHandler')}}/>
    </div>
)

export default App
