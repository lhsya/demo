/**
 * web_tj v0.0.1 | (c) 2018
 * 日志规范参考https://wiki.lagou.com/pages/viewpage.action?pageId=13796630
 * 日志上报方法参考https://wiki.lagou.com/pages/viewpage.action?pageId=13800005
 */
/* eslint-disable */
(function (factory) {
  window.LGWebTj = factory();
}(() => {
  /*!
  * 引入简化cookie操作的库
  * JavaScript Cookie v2.1.3
  * https://github.com/js-cookie/js-cookie
  *
  * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
  * Released under the MIT license
  */
  (function (factory) {
    const OldCookies = window.Cookies;
    const api = window.Cookies = factory();
    api.noConflict = function () {
      window.Cookies = OldCookies;
      return api;
    };
  }(() => {
    function extend(){var i=0;var result={};for(;i<arguments.length;i++){var attributes=arguments[i];for(var key in attributes){result[key]=attributes[key]}}return result}function init(converter){function api(key,value,attributes){if(typeof document==="undefined"){return}if(arguments.length>1){attributes=extend({path:"/"},api.defaults,attributes);if(typeof attributes.expires==="number"){attributes.expires=new Date(new Date()*1+attributes.expires*86400000)}attributes.expires=attributes.expires?attributes.expires.toUTCString():"";try{var result=JSON.stringify(value);if(/^[\{\[]/.test(result)){value=result}}catch(e){}value=converter.write?converter.write(value,key):encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent);key=encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var stringifiedAttributes="";for(var attributeName in attributes){if(!attributes[attributeName]){continue}stringifiedAttributes+="; "+attributeName;if(attributes[attributeName]===true){continue}stringifiedAttributes+="="+attributes[attributeName].split(";")[0]}return(document.cookie=key+"="+value+stringifiedAttributes)}var jar={};var decode=function(s){return s.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)};var cookies=document.cookie?document.cookie.split("; "):[];var i=0;for(;i<cookies.length;i++){var parts=cookies[i].split("=");var cookie=parts.slice(1).join("=");if(!this.json&&cookie.charAt(0)==='"'){cookie=cookie.slice(1,-1)}try{var name=decode(parts[0]);cookie=(converter.read||converter)(cookie,name)||decode(cookie);if(this.json){try{cookie=JSON.parse(cookie)}catch(e){}}jar[name]=cookie;if(key===name){break}}catch(e){}}return key?jar[key]:jar}api.set=api;api.get=function(key){return api.call(api,key)};api.getJSON=function(){return api.apply({json:true},arguments)};api.remove=function(key,attributes){api(key,"",extend(attributes,{expires:-1}))};api.defaults={};api.withConverter=init;return api}return init(function(){})
  }));

  /**
   * 神策数据生成uuid的规则
   * https://github.com/sensorsdata/sa-sdk-javascript/blob/master/src/sensorsdata.full.js
   */
  var just_test_distinctid_2;
  var UUID = (function(){var T=function(){var d=1*new Date(),i=0;while(d==1*new Date()){i++}return d.toString(16)+i.toString(16)};var R=function(){return Math.random().toString(16).replace(".","")};var UA=function(n){var ua=navigator.userAgent,i,ch,buffer=[],ret=0;function xor(result,byte_array){var j,tmp=0;for(j=0;j<byte_array.length;j++){tmp|=(buffer[j]<<j*8)}return result^tmp}for(i=0;i<ua.length;i++){ch=ua.charCodeAt(i);buffer.unshift(ch&255);if(buffer.length>=4){ret=xor(ret,buffer);buffer=[]}}if(buffer.length>0){ret=xor(ret,buffer)}return ret.toString(16)};return function(){var se=String(screen.height*screen.width);if(se&&/\d{5,}/.test(se)){se=se.toString(16)}else{se=String(Math.random()*31242).replace(".","").slice(0,8)}var val=(T()+"-"+R()+"-"+UA()+"-"+se+"-"+T());if(val){just_test_distinctid_2=1;return val}else{just_test_distinctid_2=2;return(String(Math.random())+String(Math.random())+String(Math.random())).slice(2,15)}}})();
  // 上报数据源
  var REMOTE = {
    server: document.location.protocol + '//sa.lagou.com/collect.gif'
  };

  /**
   * 获取当前日期和时间的字符串yyyyMMddHHmmss
   * 
   * @returns 
   */
  function getNowDatetimeStr() {
    var t = new Date();
    var dateArr = t.toLocaleString().split(' ')[0].split('/');
    var timeArr = t.toTimeString().split(' ')[0].split(':');
    var result = [].concat(dateArr, timeArr).map(function(item) {
      return add0(item);
    }).join('');
    return result;
  }
  function add0(num) {
    var _num = Number(num);
    if(isNaN(_num)) return num;
    return _num > 9 ? '' + _num : '0' + _num;
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
   * data-lg-webtj-added_props="{p:1,q:2}" // 自定义字段
   * data-lg-webtj-trigger_type="click/no" // 点击触发(默认点击触发）、业务模块自定义触发时机
   * 
   * data-lg-webtj-_address_id
   * data-lg-webtj-_content_id
   * data-lg-webtj-_ip
   * data-lg-webtj-_city
   * data-lg-webtj-_province
  */
  if (!Cookies.get('WEBTJ-ID')) {
    Cookies.set('WEBTJ-ID', getNowDatetimeStr() + '-' + UUID(), {
      path: '/'
    });
  }
  var propertyPrefix = 'data-lg-webtj-';
  var LGID = Cookies.get('WEBTJ-ID');
  var time;
  var lt;
  var user_id;

  // web维度
  var os;
  var ip;
  var screen_height = window.document.documentElement.clientHeight;
  var screen_width = window.document.documentElement.clientWidth;
  var city;
  var province;
  var referer = document.referrer;
  var plat = (/(android)|(webos)|(iphone)|(ipad)|(ipod)|(blackberry)|(windows\sphone)/i).test(navigator.userAgent) ? 'H5' : 'PC';


  // 点击上报（由于用的较多，故写入sdk）
  var _ELS = document;

  if (_ELS.addEventListener) {

    _ELS.addEventListener('click', handleSingleID, true);

  } else if (_ELS.attachEvent) {

    _ELS.attachEvent('onclick', handleSingleID);

  }

  /**
   * 注册点击事件回调
   */

  function handleSingleID(e) {

    var target = e.target || e.srcElement;

    while (target && target.getAttribute) {
      if (target.getAttribute(propertyPrefix + '_address_id') || target.getAttribute('data-lg-tj-id')) {
        break;
      } else {
        target = target.parentNode;
      }
    };
    if (!target || !target.getAttribute || target.getAttribute(propertyPrefix + 'trigger_type') === 'no') {
      return;
    };

    time = (new Date()).getTime();
    lt = plat === 'PC' ? 'pcclick' : 'h5click';
    user_id = Cookies.get('LG_LOGIN_USER_ID');
    os = window.navigator.platform;
    ip = target.getAttribute(propertyPrefix + '_ip');
    city = target.getAttribute(propertyPrefix + '_city');
    province = target.getAttribute(propertyPrefix + '_province');
    // 各业务需自定义统计的字段数据
    var addedProps = target.getAttribute(propertyPrefix + 'added_props');
    
    /**
     * 字段含义参见https://wiki.lagou.com/pages/viewpage.action?pageId=13796630
     */
    var _params = {
      LGID: LGID,
      time: time,
      lt: lt,
      user_id: user_id,
      os: os,
      ip: ip,
      screen_height: screen_height,
      screen_width: screen_width,
      city: city,
      province: province,
      referer: referer
    };
    _params.page_id = window.PAGE_ID;
    _params.address_id = target.getAttribute(propertyPrefix + '_address_id');
    _params.content_id = target.getAttribute(propertyPrefix + '_content_id');
    // 旧点击数据的兼容
    var tjEncodeId = target.getAttribute('data-lg-tj-id');
    if (tjEncodeId) {
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
      var cid = target.getAttribute('data-lg-tj-cid');
      _params.address_id = tjEncodeId;
      _params.content_id = cid === 'idnull' ? '' : cid;
      _params.click_props = JSON.stringify({
        t: target.tagName.toLocaleLowerCase(),
        dl: window.location.href,
        dr: document.referrer,
        dt: document.title,
        tjEncodeId: tjEncodeId,
        tjNo: (target.getAttribute('data-lg-tj-no') || 'idnull').trim(),
        tjCid: (target.getAttribute('data-lg-tj-cid') || 'idnull').trim(),
        abt: (target.getAttribute('data-lg-tj-abt') || '').trim(),
        intrack: _P_TRACK_CODE
      });
    } else if (addedProps) {
      _params.click_props = addedProps;
    }
    
    for(var key in _params) {
      if (_params.hasOwnProperty(key)) {
        if (!_params[key]){
          delete _params[key];
        }
      }
    }

    imgGET({
      plat: plat,
      data: encodeURIComponent(JSON.stringify(_params))
    });

  }

  function isObject(obj) {
    return Object.prototype.toString.call(obj) === 'object Object';
  }

  function uploadSelfHelp(params) {
    // 各业务需自定义统计的字段数据
    var addedProps = params.added_props;
    time = (new Date()).getTime();
    lt = params._lt;
    user_id = Cookies.get('LG_LOGIN_USER_ID');
    os = window.navigator.platform;
    ip = params._ip;
    city = params._city;
    province = params._province;

    if (!lt) {
      return;
    }

    var _params = {
      LGID: LGID,
      time: time,
      lt: lt,
      user_id: user_id,
      os: os,
      screen_height: screen_height,
      screen_width: screen_width,
      ip: ip,
      city: city,
      province: province,
      referer: referer
    };

    _params.page_id = window.PAGE_ID;
    // PC和H5的pageview统计
    if (lt === 'pcpv' || lt === 'h5pv') {
      _params.url = location.href;
    // PC和H5的点击统计
    } else if (lt === 'pcclick' || lt === 'h5click') {
      _params.address_id = params._address_id;
      _params.content_id = params._content_id;
      if (isObject(addedProps)) {
        _params.click_props = JSON.stringify(addedProps);
      }
    // PC和H5的曝光日志
    } else if (lt === 'pcshow' || lt === 'h5show') {
      var showParams = params._show_params;
      var elementIds = params._element_ids;
      var elementStrategy = params._element_strategy;

      _params.address_id = params._address_id;
      _params.page_number = params._page_number;

      if (isObject(showParams)) {
        _params.show_params = JSON.stringify(showParams);
      }
      if (isObject(elementIds)) {
        _params.element_ids = JSON.stringify(elementIds);
      }
      if (isObject(elementStrategy)) {
        _params.element_strategy = JSON.stringify(elementStrategy);
      }
      if (isObject(addedProps)) {
        _params.show_props = JSON.stringify(addedProps);
      }
    } else {
      /**
       * 当自定义字段名和SDK内置的字段名冲突时，自定义字段将被放弃
       */
      if (isObject(addedProps)) {
        for (var item in addedProps) {
          if(Object.prototype.hasOwnProperty.call(addedProps, item) && Object.prototype.toString.call(_params[item]) === '[object Undefined]') {
             _params[item] = addedProps[item];
          }
        }
      }
    }

    
    for(var key in _params) {
      if (Object.prototype.hasOwnProperty.call(_params, key)) {
        if (!_params[key]){
          delete _params[key];
        }
      }
    }
    imgGET({
      plat: plat,
      data: encodeURIComponent(JSON.stringify(_params))
    });
  }
  return uploadSelfHelp;

}));
