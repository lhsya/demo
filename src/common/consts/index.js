const isDevelopment = process.env === "development";

export const STATE = {
    SUCCESS: 1,
    ERROR: {
        SERVER_ERROR: 1002,
        AUTHENTICATION_FAILED: 1004
    }
};

export const ERROR_MESSAGE = {
    SERVER_ERROR: "服务器开小差啦，请稍后再试～",
    AUTHENTICATION_FAILED: "你当前没有权限，登录再来吧～"
}

export const HOST = {
    GATE_ENTRY:  isDevelopment ? "" : "https://gate.lagou.com/v1/entry",
    GATE_NEIRONG:  isDevelopment ? "" : "https://gate.lagou.com/v1/neirong",
    PASSPORT: isDevelopment ? "" : "https://passport.lagou.com",
    ACTIVITY: isDevelopment ? "" : "https://activity.lagou.com/activityapi",
}