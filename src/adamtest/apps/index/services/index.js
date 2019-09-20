import Api from "$common/services/auth";
import Toast from "$common/components/toast";

const SERVER_ERROR_TIP = "服务器数据异常，稍后再试。";
const DURATION = 2500;
const ORIGIN_FOR_API = "https://gate.lagou.com/v1";
let api;
let localOption = {};
if (process.env === "development") {
    api = new Api(location.origin);
    localOption = {
        cross: false,
        headers: {
            "X-L-REQ-HEADER": "{deviceType: 10}",
            "X-L-USER-ID": "100013368",
        }
    }
} else {
    api = new Api(ORIGIN_FOR_API);
    localOption = { cross: true };
}

const get = (url, params, option = {}) => {
    return new Promise((resolve, reject) => {
        api.get(url, params, {
            ...localOption,
            ...option
        }).then(data => {
            if(data.state == 1){
                resolve(data);
            } else {
                reject(data);
                Toast.info(SERVER_ERROR_TIP, DURATION);
            }
        }).catch(data => {
            console.log(data,'catch')
            reject(data.message);
            Toast.info(SERVER_ERROR_TIP, DURATION);
        });
    });
}


export default {
    get,
    testApi: () => {
        return get("/entry/testApi");
    }
};
