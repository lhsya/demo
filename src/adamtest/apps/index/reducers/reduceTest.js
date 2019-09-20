const defaultState = {
    demoTest: 'reducerTest111'
}
const reducerTest = (state = defaultState, action) => {
    switch (action.type) {
        case 'testOO':
            return {
                demoTest: action.payload.demoTest
            }
        default:
            return state
    }
}

export default reducerTest
