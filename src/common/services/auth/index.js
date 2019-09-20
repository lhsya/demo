import Api from "../api";

import { METHODS } from "$common/services/api";

import { browserAuth, appAuth } from "$common/services/login/index";

import { isLagouApp } from "$common/utils/index";

const isApp = isLagouApp();

export class AuthApi extends Api {

    constructor(host){
        super();
        this.host = host;
        this.isLogin = false;
    }

    login() {
        if (isApp) {
            return appAuth();
        }
        return browserAuth();
    }

    auth(method, url, data, option) {
        if (this.isLogin) {
            return super[method.toLowerCase()](url, data , option)
        }
        return this.login().then((res) => {
            this.isLogin = true;
            return super[method.toLowerCase()](url, data , option)
        })
    }

    get (url, data , option){
        return this.auth(METHODS.GET, url, data, option);
    }
    
    post(url, data, option){
        return this.auth(METHODS.POST, url, data, option);
    }
}

export default AuthApi;