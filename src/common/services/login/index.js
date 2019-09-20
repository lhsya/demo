import { getQueryString, isLagouApp, isWx } from "../../utils/index";
import Services from "./services/biz";

const GLOBAL_DOMAIN = {
    acctx: "https://activity.lagou.com"
}

const STATE = {
    logged: 200,
    notLogin: 201
}

const NEW_APP_LOGIN_COOKIE = "gate_login_token";

// 浏览器登录
export function browserAuth() {
    let href = window.location.href;
    return Services.ifLogin().then(data => {
        if (data.success) {
            let state = data.state
            if (state == STATE.logged) { //登录成功
                Promise.resolve();
                return;
            }
            if (state == STATE.notLogin) {// 无登录用户
                window.location.href = `${GLOBAL_DOMAIN.acctx}/activityapi/basic/login.html?redirect=${encodeURIComponent(href)}`;
            }
        } else {
            Promise.reject(data.message || '登录失败');
        }
    });

}

const getCheckCodeUrl = "https://www.lagou.com/center/login?forward=";

// const goBackControl = (() => {
//     return {
//         saveReffer: () => {
//             window.localStorage && window.localStorage.setItem("lg_referrer", document.referrer.split("?")[0]);
//         },
//         controlGoBack: () => {
//             window.appBeforeGoBack = window.appBeforeGoBack || function() { 
//                 let referrer = window.localStorage ? window.localStorage.getItem("lg_referrer") : "";
//                 if (!referrer || referrer.indexOf(getCheckCodeUrl) > -1 || window.location.href.indexOf(referrer) > -1) {
//                     window.location.href = "https://www.lagou.com/h5/close";
//                 } else {
//                     history.go(-2);
//                 }
//                 return false; 
//             }
//         }
//     }
// })();

function isNewAppLogin() {
    return document.cookie.indexOf(NEW_APP_LOGIN_COOKIE) > -1;
}

// app 登录
export function appAuth() {
    if (isNewAppLogin()) {
        return Promise.resolve();
    }
    let checkcode = getQueryString("checkCode");
    let href = window.location.href;
    if (!checkcode) {
        window.location.href = `${getCheckCodeUrl}${encodeURIComponent(href)}`;
        return;
    }
    // if (!checkcode) {
    //     goBackControl.saveReffer();
    //     window.location.href = `${getCheckCodeUrl}${encodeURIComponent(href)}`;
    //     return;
    // } else {
    //     goBackControl.controlGoBack();
    // }

    return Services.appAutoLogin({
        checkCode: checkcode.split("#")[0]
    }).then(data => {
        if (data.state == 200) {  // 已登录
            return Promise.resolve()
        }
        return Promise.reject()
    });
}


// 微信授权登录
export function weixinAuth(){
    let href = window.location.href;
    return Services.hasOpenId().then(data => {
        if (data.state == STATE.logged) {  // 已登录
            return Promise.resolve()
        }
        if(data.state == STATE.notLogin){   // 未登录
            window.location.href =`${GLOBAL_DOMAIN.acctx}/activityapi/weixin/auth.html?url=` + encodeURIComponent(href)
        }
    })
}

export function login() {
    let _isLagouApp = isLagouApp()
    let _isWx = isWx();
    if (_isLagouApp) {
        return appAuth()
    }
    if (_isWx) {
        return weixinAuth()
    }
    return browserAuth()
}