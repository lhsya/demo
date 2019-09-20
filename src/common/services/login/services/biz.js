import Api from "../../api";

const api = new Api("");

export default {
    ifLogin: () => {
        return api.get("/activityapi/basic/ifLogin");
    },
    appAutoLogin: (data) => {
        return api.get("/activityapi/basic/appAutoLogin.json", data);
    },
    hasOpenId: () => {
        return api.get("/activityapi/weixin/hasOpenId");
    }
}
