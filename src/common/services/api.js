import "whatwg-fetch";
import "url-polyfill";
import extend from "extend";
import { showMessage } from '$common/components/modals';

class AbstractApi {
    constructor(){
    }
    get() {}
    post() {}
}

export const METHODS = {
    GET: "GET",
    HEAD: "HEAD",
    POST: "POST",
    DELETE: "DELETE",
    OPTIONS: "OPTIONS",
    PUT: "PUT",
    JSONP: "JSONP"
};
const NET_ERROR = "网络异常";

export class Api extends AbstractApi {

    constructor(host){
        super();
        this.host = host;
    }
    static getSearchParams(obj){
        let urlSearchParamsObj = new URLSearchParams();
        for(let key in obj){
            urlSearchParamsObj.set(key, obj[key]);
        }
        return urlSearchParamsObj.toString();
    }
    getUrl(url, data, method = METHODS.GET){
        let urlIns;
        let key;
        if (url.indexOf("http") === 0){
            urlIns  = new URL(url);
        }else{
            url = this.host + url;
            urlIns  = new URL(url, document.URL);
        }
        if (method == METHODS.GET || method == METHODS.HEAD){
            for(key in data){
                urlIns.searchParams.set(key, data[key]);
            }
            urlIns.searchParams.set("_t", +new Date());
        }
        return urlIns.toString();
    }

    fetch(url, data, option){
        let args = {
            bodyStream: "json", //arraybuffer blob formData text json
            method: METHODS.GET,
            credentials: "same-origin"
        };
        Object.assign(args, option);
        url = this.getUrl(url, data, args.method);
        //处理body 以及参数
        if (args.method == METHODS.GET || args.method == METHODS.HEAD){
        }else{
            if (data.constructor == Object.prototype.constructor){
                args.body = Api.getSearchParams(data);
            }else{
                args.body = data;
            }
        }
        let request =  new Request(url, args);
        return new Promise((resolve, reject) => {
            // showMessage(String(fetch), 5000)
            window.fetch(request).then((response) => {
                    // showMessage(String(response.ok), 5000)
                    if(response.ok){
                        response[args.bodyStream]().then(data => {
                                // showMessage(JSON.stringify(data), 10000000);
                                resolve(data);
                            },
                            e => {
                                reject(new Error(`body response stream [${args.bodyStream}] error : ${e}`));
                            });

                    }else{
                        reject(new Error("error " + response.status));
                    }
                },
                e  => {
                    reject(e);
                });
        });

    }
    get (url, data , option){
        return this.fetch(url, data, option);
    }
    post(url, data, option){
        let args = {
            method: METHODS.POST,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        return this.fetch(url, data, Object.assign(args, option));

    }
    jsonp(url, data, option){
        let args = {
            type: "text/javascript",
            charset: "UTF-8",
            jsonp: "callback",
            jsonpCallback: "jsonp" + Math.random().toString().substr(2)
        };
        Object.assign(args, option);
        data = data || {};
        data[args.jsonp] = args.jsonpCallback;
        return new Promise((resolve, reject) => {
            window[args.jsonpCallback] = function (data) {
                resolve(data);
                window[args.jsonpCallback] = null;
            };
            let script = document.createElement("script");
            script.type = args.type;
            script.charset = args.charset;
            script.onload = function () {
                script.onload =  null;
                document.head.removeChild(script);
            };
            script.onerror = function () {
                script.onerror =  null;
                document.head.removeChild(script);
                reject(new Error(NET_ERROR));
            };
            script.src = this.getUrl(url, data);
            document.head.appendChild(script);
        });
    }
}

const storage = {
    get(key) {
        return localStorage.getItem(key);
    },
    set(key, val, cacheDuration) {
        localStorage.setItem(key, JSON.stringify(val) + "|" + (+new Date()) + "|" + cacheDuration);
    },
    remove(key) {
        localStorage.removeItem(key);
    }

};

export class CacheApi extends Api {
    constructor(host){
        super(host);
        this.caches = {};
    }
    request(method, url, data, option){
        return  new Promise((resolve, reject) => {
            super[method.toLowerCase()](url, data , option).then(data => {
                resolve(data);
            }, e => {
                reject(e);
            });

        });

    }
    memoryCache(method, url, data, option){
        let args = {
            memoryCache : false
        };
        Object.assign(args, option);
        let key = url + JSON.stringify(data);
        let res = this.caches[key];
        if (!res){
            this.caches[key] = new Promise((resolve, reject) => {
                this.request(method, url, data, args).then(data => {
                    if ( !data){
                        this.caches[key] = null;
                    }
                    resolve(data);
                }, e => {
                    this.caches[key] = null;
                    reject(e);
                });
            });
        }
        return this.caches[key];

    }

    getLocalData(key){
        let data = null;
        let localData = storage.get(key);
        if (!localData){
            return data;
        }
        let arr = localData.split("|");
        let isAvailable = parseInt(arr[1]) + parseInt(arr[2]) > +new Date;
        if (isAvailable){
            try{
                data = JSON.parse(arr[0]);
            }catch (e) {
                console.log("local cache parse data is error");

            }
        }
        return data;
    }
    localCache(method, url, data, option){
        option.localCache instanceof Object || delete option.localCache;

        let args = {
            localCache: {
                cacheTime: 5 * 60 * 1000 //毫秒
            }
        };

        extend(true, args, option);
        let key = url + JSON.stringify(data);
        let localData = this.getLocalData(key);

        return new Promise((resolve, reject ) => {
            if (localData ){
                resolve(localData);
                return;
            }
            this.request(method, url, data, args)
                .then(data => {
                    storage.set(key, data, args.localCache.cacheTime);
                    resolve(data);
                })
                .catch(e => {
                    reject(e);
                });
        });
    }
    cache(method, url, data, option){
        const { localCache } = option instanceof Object ? option : {};
        let args = {
            memoryCache: false,
            localCache: localCache instanceof Object ? localCache : Boolean(localCache)
            // localCache: null
        };

        Object.assign(args, option);
        if (args.memoryCache){
            return this.memoryCache(method, url, data, option);
        }
        if (args.localCache){
            return this.localCache(method, url, data, option);
        }
        return this.request(method, url, data, option);
    }
    get(url, data, option){
        return this.cache(METHODS.GET, url, data, option);
    }
    jsonp(url, data, option){
        return this.cache(METHODS.JSONP, url, data, option);
    }
}

function removeInvalidProperties(obj){
    obj = {...obj};
    for(let n in obj){
        try{
            (obj[n] === '' || obj[n] === null || obj[n] === undefined) && delete obj[n];
        } catch(e) {}
    }

    return obj;
}

export class CrossApi extends CacheApi {

    constructor(host){
        super();
        this.host = host;
    }

    // option = {
    //     credentials: "include",
    //     headers: {
    //         "X-L-REQ-HEADER": "{deviceType:1}",
    //         "Content-Type": "application/json"
    //     }
    // }

    get (url, data = {} , option){
        let args = {
            cross: false
        };
        Object.assign(args, option);
        args.cross ? Object.assign(args, this.option, option) : Object.assign(args, option);
        return super.get(url, removeInvalidProperties(data) , args);
    }

    post(url, data = {}, option){
        let args = {
            cross: false
        };
        Object.assign(args, option);
        if (args.cross) {
            Object.assign(args, this.option, option);
            data = removeInvalidProperties(data);
            data = JSON.stringify(data);
        } else {
            Object.assign(args, option);
        }
        return super.post(url, data, args)
    }

}

export default CrossApi;

