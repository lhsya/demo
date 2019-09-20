
const LGBRIDGE_NOT_FOUND = 1006;

const ERROR_MESSAGE = {
    lgBridgeNotFound: "lgBridge未找到"
}

export const STATE = {
    error: 1005,
    notFound: 1004,
    success: 1002,
    lgBridgeNotFound: LGBRIDGE_NOT_FOUND
};

export class ErrorBridge {
    constructor (state, message) {
        this.state = state;
        this.message = message;
    }
}

export default {
    request(methodName, data, ext) {
        let message = {};

        let lgBridge = window.lgBridge;

        if (data) {
            message.data = data;
        }

        if (ext) {
            message.ext = ext;
        }

        return new Promise((resolve, reject) => {

            if (!lgBridge) {
                reject(new ErrorBridge(STATE.lgBridgeNotFound, ERROR_MESSAGE.lgBridgeNotFound))
            };

            lgBridge.request(methodName, message, (data) => {
                if (data.state != STATE.success) {
                    reject(data)
                } else {
                    resolve(data.data);
                }
            });
        });
    },
    response(methodName, callback) {

        let lgBridge = window.lgBridge;
 
        if (!lgBridge) {
            console.log(ERROR_MESSAGE.lgBridgeNotFound);
            return;
        }

        lgBridge.response(methodName, (data, response, ext) => {
            callback && callback({
                data: data,
                ext: ext
            }, response);
        });
    }
}