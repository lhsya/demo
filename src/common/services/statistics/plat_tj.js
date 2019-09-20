/**
 * _PTJ 平台统计文件
 * @author stormlu@lagou.com
 * @date 2015-08-26
 * @global window._PTJ
 */

/**
 * 使用需知：
 *
 * 使用script标签引入：
 * <script src="http://static.lagou.com/static/analysis/plat_tj.js"></script>
 *
 * 1、编码统计
 * 
 * (1)每个需要添加编码统计的标签必须添加如下自定义属性，如没有使用此插件的默认值即可（一般为空）
 * eg: <a href="xxx" data-lg-tj-id="ADKD" data-lg-tj-no="0101" data-lg-tj-cid="内容id"></a>
 *
 * 具体实现: 动态创建img的方法
 *
 * 编码ID规则: ADKD_序列号_版本号_内容ID_随机数
 *
 * (2)a/b-test统计参数abt
 * 若需要a/b-test统计,在要统计的标签上添加自定义属性 data-lg-tj-abt
 *
 * (3)透传码统计规则
 * 透传统计基于编码统计的元素所在的模块（父元素、祖先元素）或者元素本身
 * 若需要透传统计,在要统计的模块或者元素上添加自定义属性 data-lg-tj-track-code data-lg-tj-track-type
 * @data-lg-tj-track-code 透传码
 * @data-lg-tj-track-type 透传类型(可选,默认为0,普通型为0,覆盖型为1)
 * 
 * 2、GA统计
 * 使用script标签引入：
 * <script src="http://static.lagou.com/static/analysis/analytics.js"></script>
 * 
 * @每个需要添加GA统计的标签需添加如下自定义属性，其中data-lg-gatj-method,data-lg-gatj-msgtype,data-lg-gatj-val为可选属性
 * eg: <a href="xxx" data-lg-gatj-method="send" data-lg-gatj-msgtype="event" data-lg-gatj-msg="dashboard,去筛选,number" data-lg-gatj-val="2"></a>
 * 
 * 参数释义详见 https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 *
 */

// 引入简化cookie操作的库
/*!
 * JavaScript Cookie v2.1.3
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
    var OldCookies = window.Cookies;
    var api = window.Cookies = factory();
    api.noConflict = function () {
        window.Cookies = OldCookies;
        return api;
    };
}(function () {
    function extend () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[ i ];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init (converter) {
        function api (key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
                return;
            }

            // Write

            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);

                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }

                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}

                if (!converter.write) {
                    value = encodeURIComponent(String(value))
                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }

                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);

                return (document.cookie = [
                    key, '=', value,
                    attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    attributes.path ? '; path=' + attributes.path : '',
                    attributes.domain ? '; domain=' + attributes.domain : '',
                    attributes.secure ? '; secure' : ''
                ].join(''));
            }

            // Read

            if (!key) {
                result = {};
            }

            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()"
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');

                if (cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ?
                        converter.read(cookie, name) : converter(cookie, name) ||
                        cookie.replace(rdecode, decodeURIComponent);

                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }

            return result;
        }

        api.set = api;
        api.get = function (key) {
            return api.call(api, key);
        };
        api.getJSON = function () {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};

        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };

        api.withConverter = init;

        return api;
    }

    return init(function () {});
}));

// 编码统计正文
(function() {

    /**
     * 方法1：请求目标地址
     * @type {Object}
     */
    var REMOTE = {

        server: document.location.protocol + '//a.lagou.com/track'

    };

    /**
     * 编码ID规则
     *
     * _PID ：ADKD
     * _PNO ：序列号
     * _PV ：版本号
     * _PCONTENTID ：内容ID
     * _PRANDOM ：随机数
     *
     * @type {Object}
     */
    var _PID = '',
        _PNO = '',
        _PV = 0,
        _PCONTENTID = '',
        _PRANDOM = '',
        _PABT = '',
        //GA统计
        _GAMETHOD = '',
        _GAMSGTYPE = '',
        _GATJ = '',
        _GATJVAL = 0,
        v = 1,
        t = 'a',
        dl = window.location.href,
        dr = document.referrer,
        dt = document.title;

    /**
     * 以http://开头的正则
     * @type {Object}
     */
    //var reg_HTTP = /http:\/\/([^\/]+)\//i;
    /*
     v  版本号
     t  类型
     取值
     含义
     button button
     a  a标签
     
     dl 当前URL
     dr Referer
     dt 当前Title
     aid  追踪ID
     */
    /**
     * 给全部html标签注册事件
     *
     * 处理浏览器兼容问题
     */
    var _ELS = document;

    if (_ELS.addEventListener) {

        _ELS.addEventListener('click', postEncodingID, true);

    } else if (_ELS.attachEvent) {

        _ELS.attachEvent('onclick', postEncodingID);

    }

    /**
     * 注册事件处理
     *
     * @param {Object} opt 请求参数
     */

    function postEncodingID(e) {

        var target = e.target || e.srcElement;
        var arr_GATJ = [];

        while (target && target.getAttribute) {
            if (target.getAttribute('data-lg-tj-id') || target.getAttribute('data-lg-gatj-msg')) {
                break;
            } else {
                target = target.parentNode;
            }
        };
        if (!target || !target.getAttribute) {
            return;
        };

        try {

            _PID = (target.getAttribute('data-lg-tj-id') || 'idnull').trim();
            _PNO = (target.getAttribute('data-lg-tj-no') || 'idnull').trim();
            _PCONTENTID = (target.getAttribute('data-lg-tj-cid') || 'idnull').trim();
            _PRANDOM = getRandom();
            _PABT = (target.getAttribute('data-lg-tj-abt') || '').trim();
            _CONTENT = '';
            if (target.getAttribute('data-lg-input-tj-nocontent') != 'nocontent') {
                _CONTENT = (target.value || target.getAttribute('data-lg-tj-content') || '').trim();
            }

            var trackModule = target;
            while (trackModule && trackModule.getAttribute) {
                if (trackModule.getAttribute('data-lg-tj-track-code')) {
                    var _TRACK_CODE = (trackModule.getAttribute('data-lg-tj-track-code') || '').trim(),
                        _TRACK_TYPE = (trackModule.getAttribute('data-lg-tj-track-type') || '0').trim();
                    break;
                } else {
                    trackModule = trackModule.parentNode;
                }
            };

            if (Cookies.get('TG-TRACK-CODE') && Cookies.get('TG-TRACK-CODE') != '') {
                _TRACK_TYPE == 1 && _TRACK_CODE && Cookies.set('TG-TRACK-CODE', _TRACK_CODE, {
                    path: '/'
                });
            } else {
                _TRACK_CODE && Cookies.set('TG-TRACK-CODE', _TRACK_CODE, {
                    path: '/'
                });
            }

            var _P_TRACK_CODE = Cookies.get('TG-TRACK-CODE');

            //GA统计
            _GAMETHOD = (target.getAttribute('data-lg-gatj-method') || 'send').trim();
            _GAMSGTYPE = (target.getAttribute('data-lg-gatj-msgtype') || 'event').trim();
            _GATJ = (target.getAttribute('data-lg-gatj-msg') || '').trim();
            _GATJVAL = parseInt(target.getAttribute('data-lg-gatj-val') || 0);
            //GA统计
            if (_GATJ && typeof ga == 'function') {
                arr_GATJ.push(_GAMETHOD, _GAMSGTYPE);
                arr_GATJ = arr_GATJ.concat(_GATJ.split(','));
                !!_GATJVAL && arr_GATJ.push(_GATJVAL);
                ga.apply(null, arr_GATJ);
            };

            if (_PID != 'idnull') {

                var _params = {};
                _params.v = v;
                _params.t = target.tagName.toLocaleLowerCase();
                _params.dl = encodeURIComponent(dl);
                _params.dr = encodeURIComponent(dr);
                _params.dt = dt;
                _params.content = _CONTENT;
                _params.aid = [_PID, _PNO, _PV, _PCONTENTID, _PRANDOM].join('_');
                !!_PABT && _PABT != '|' && (_params.abt = _PABT);
                !!_P_TRACK_CODE && _P_TRACK_CODE != '' && (_params.intrack = _P_TRACK_CODE);

                imgGET(_params);

            } else {

                return;

            }

        } catch (e) {}

    }

    /**
     * 发送请求给远程服务
     *
     */
    function imgGET(params) {

        var _img = new Image();
        var paramsArr = [];
        for (var item in params) {
            if (typeof item == 'string') {
                paramsArr.push(item + '=' + params[item]);
            }
        }
        _img.src = REMOTE.server + '?' + paramsArr.join('&');

    }

    /**
     * 返回随机数
     */
    function getRandom(digit) {
        window._CASH_RANDOM ? '' : window._CASH_RANDOM = {};
        var _cash_random = window._CASH_RANDOM || {},
            _digit = digit || 4,
            _random = getRandomSimple();

        while (_cash_random[_random]) {
            _random = getRandomSimple();
            if (!_cash_random[_random]) break;
        }

        window._CASH_RANDOM[_random] = _random;

        return _random;

        //随即返回随机数  --  可能重复
        function getRandomSimple() {
            var random = '';
            for (var i = 0; i < _digit; i++) {
                var r = Math.floor(Math.random() * 10);
                random += r.toString();
            }
            return random.toString();
        }
    }

    /**
     * 使用_PTJ全局变量对外
     * 调用方法 _PTJ.postEncodingID
     * @type {Object}
     */
    window._PTJ = window._PTJ || {

        postEncodingID: postEncodingID

    }

})();
