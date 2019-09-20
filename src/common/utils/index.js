let _isWxMini;

export function isIos() {
    var ua = navigator.userAgent
    return ua.search(/\(i[^;]+;( U;)? CPU.+Mac OS X/) > -1
}

export function isAndroid() {
    var ua = navigator.userAgent;
    return ua.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
}

export function isWx() {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
    } else {
        return false
    }
}

export function getQueryString(name) {
    var url = window.location.href;
    var reg = new RegExp("(^|&|#)" + name + "=([^&]*)(&|$)");
    var r = url.slice(url.indexOf('?') + 1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

export function isLagouApp() {
    var storage = window.localStorage;
    var isAppFromUrl = /lagoufrom=android|lagoufrom=ios/i.test(window.location.href);
    if (!storage) {
        return /lagou/i.test(navigator.userAgent)
    }
    if (isAppFromUrl) {
        storage && storage.setItem('isLagouApp', true);
        return true;
    }
    if (storage.getItem('isLagouApp') === "true") {
        return true;
    }
    return false;

}

export function closeWebView() {
    window.location.href = "lagou://lagou.com/h5/close";
}

export function isWxMini() {
    if (typeof _isWxMini !== 'undefined') {
        return new Promise((resolve, reject) => {
            resolve(_isWxMini);
        })
    }
    return new Promise((resolve, reject) => {
        if (!isWx() || !wx.miniProgram) {
            _isWxMini = false;
            resolve(false)
        }
        wx.miniProgram.getEnv(function (res) {
            if (res.miniprogram) {
                _isWxMini = true;
                resolve(true)
            } else {
                _isWxMini = false;
                resolve(false)
            }
        })
    });

}

export function isIphoneX() {
    return /iphone/gi.test(window.navigator.userAgent) && window.devicePixelRatio && window.devicePixelRatio === 3 && (window.screen.width === 375 || window.screen.width === 414) && (window.screen.height === 812 || window.screen.height === 896);
}

//yyyy年MM月dd日 hh:mm:ss.S 输出: 2016年04月01日 10:41:08.133
//yyyy-MM-dd hh:mm:ss 输出: 2016-04-01 10:41:08
//yy-MM-dd hh:mm:ss 输出: 16-04-01 10:41:08
//yy-M-d hh:mm:ss 输出: 16-4-1 10:41:08

export function dateFormat(time, fmt) {
    if (!time) {
        return '';
    }
    var date = new Date(time);
    var o = {
        "y+": date.getFullYear(),
        "M+": date.getMonth() + 1,                 //月份
        "d+": date.getDate(),                    //日
        "h+": date.getHours(),                   //小时
        "m+": date.getMinutes(),                 //分
        "s+": date.getSeconds(),                 //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S+": date.getMilliseconds()             //毫秒
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            if (k == "y+") {
                fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
            }
            else if (k == "S+") {
                var lens = RegExp.$1.length;
                lens = lens == 1 ? 3 : lens;
                fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
            }
            else {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
    }
    return fmt;
}

export function getStrLen(str) {
    let len = 0;
    let i;
    let c;
    for (let i = 0; i < str.length; i++) {
        c = str.charCodeAt(i);
        if (isDbcCase(c)) { //半角
            len = len + 1;
        } else { //全角
            len = len + 2;
        }
    }
    return len;
}

export function isDbcCase(c) {
    // 基本拉丁字母（即键盘上可见的，空格、数字、字母、符号）
    if (c >= 32 && c <= 127) {
        return true;
    }
    // 日文半角片假名和符号
    else if (c >= 65377 && c <= 65439) {
        return true;
    }
    return false;
}

export const omit = (str, length) => {
    length *= 2;
    try{
        if(getStrLen(str) <= length) {
            return str;
        } else {
            let counter = 0;
            let ret = [];
            let i = 0;
            for(; i < str.length; i++){
                let nextLength = getStrLen(str[i]);
                if((counter + nextLength) <= (length - 2)){
                    ret.push(str[i]);
                    counter += nextLength;
                } else {
                    break;
                }
            }
            
            if(counter + getStrLen(str[i]) < length){
                ret.push(str[i]); 
            }
            ret.push('...');
            return ret.join('');
        }
    } catch(e) {}

    return str;
};

export const getHash = () => {
    const regexp = /^#\/?([^\?]+)(\?.+)?/;
    const [ , hash, ] = location.hash.match(regexp) || [];

    return hash;
} 

export const getAppVersion = () => {
    const ua = navigator.userAgent;
    const [whole, appVersion] = ua.match(/Lagou\/((\d+\.)+\d+)\s+/) || [];
    return appVersion;
}

export const isAppVersionBiggerOrEqualThan = (curVersion, preVersion) => {
    const preVersionArr = preVersion.split('.') || [];
    const curVersionArr = curVersion.split('.') || [];
    const length = Math.max(preVersionArr.length, curVersionArr.length);
    
    for (let i = 0; i < length;) {
        const curVersionNum = curVersionArr[i] ? Number(curVersionArr[i]) : 0;
        const preVersionNum = preVersionArr[i] ? Number(preVersionArr[i]) : 0;
        if (curVersionNum === preVersionNum) {
            i ++;
        } else {
            return  curVersionNum > preVersionNum;
        }
    }

    return true;
}