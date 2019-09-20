
/** 
 * bridge基础接口 
*/
import bridge from "./services/index";

const ERROR_MESSAGE = {
    wrongParameter: "参数错误"
}

const METHOD_NAME_LIST = {
    setPageId: "setPageId",
    requestLocation: "requestLocation",
    goBack: "goBack",
    setTitleBarStyle: "setTitleBarStyle",
}

export default {

    METHOD_NAME_LIST: METHOD_NAME_LIST,

    setPageId(pid) {
        let methodName = METHOD_NAME_LIST.setPageId;
        if (!pid) {
            console.log(`${methodName} ${ERROR_MESSAGE.wrongParameter}`);
        }
        return bridge.request(methodName, {
            pageId: pid
        });
    },

    requestLocation(cachePolicy) {
        let methodName = METHOD_NAME_LIST.requestLocation;
        return bridge.request(methodName, {
            cachePolicy: cachePolicy || 0
        }).then((content) => {
            let { state, data } = content;
            if (!state) {
                return Promise.resolve(data);
            }
            return Promise.reject(content);
        }).catch((data) => {
            return Promise.reject(data);
        })
    },
    
    goBack() {
        let methodName = METHOD_NAME_LIST.goBack;
        return bridge.request(methodName);
    },

    setTitleBarStyle(option) {
        let methodName = METHOD_NAME_LIST.setTitleBarStyle;
        return bridge.request(methodName, option);
    },

};