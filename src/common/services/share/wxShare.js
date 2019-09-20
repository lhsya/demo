import Api from "../api";

const api = new Api("");

var isWxReady = false
var surl = window.location.href;
let callbackList = [];

export function initWxShare(datas) {

    var url = 'https://www.lagou.com/weixin/wx_share.json'

    function encode(url) {
        return encodeURIComponent(url).replace(/'/g, "%27").replace(/"/g, "%22")
    }

    var callback = function (json) {
        var data = json.message;
        data = eval("(" + data + ")");
        wx.config({
            debug: false,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo']
        });

        wx.ready(function () {
            isWxReady = true;
            if (callbackList.length != 0) {
                datas = callbackList[callbackList.length - 1];
            }    
            var shareData = {
                title: datas.title,
                desc: datas.desc,
                link: datas.shareUrl == undefined ? surl : datas.shareUrl, // 分享链接
                imgUrl: datas.imgUrl,
                success: function () {
                    // 用户确认分享后执行的回调函数

                    //如果存在统计类型 则统计分享次数
                    if (datas.activityType) {
                        
                    }

                }
            }
            var shareFrieds = {
                title: datas.title,
                link: datas.shareUrl == undefined ? surl : datas.shareUrl, // 分享链接
                imgUrl: datas.imgUrl,
                success: function () {
                    // 用户确认分享后执行的回调函数

                    //如果存在统计类型 则统计分享次数
                    // if (datas.activityType) {
                    //     countShare(datas)
                    // }

                }
            }
            wx.onMenuShareAppMessage(shareData)//分享给好友
            wx.onMenuShareQQ(shareData)
            wx.onMenuShareWeibo(shareData)
            wx.onMenuShareTimeline(shareFrieds)//朋友圈

            console.log('weixin support set success.')
        })
        wx.error(function (res) {
            //alert(res.errMsg)
        })
    }

    api.jsonp(url, {
        // url: encode(window.location.href.split('#')[0])
        url: window.location.href
    }, {
        jsonp: "jsoncallback"
    }).then(data => {
        callback && callback(data)
    })
    .catch(err => {
        console.log(err)
    })
}

export function changeWxShare(datas) {
    if (!wx) {
        callbackList.push(datas);
        return;
    }
    if (!isWxReady) {
        callbackList.push(datas);
        console.log('wx is not ready')
        return
    }
    var shareData = {
        title: datas.title,
        desc: datas.desc,
        link: datas.shareUrl == undefined ? surl : datas.shareUrl, // 分享链接
        imgUrl: datas.imgUrl,
        success: function () {
            // if (datas.activityType) {
            //     // countShare(datas)
            // }

        }
    }
    var shareFrieds = {
        title: datas.title,
        link: datas.shareUrl == undefined ? surl : datas.shareUrl, // 分享链接
        imgUrl: datas.imgUrl,
        success: function () {
            // if (datas.activityType) {
            //     countShare(datas)
            // }

        }
    }

    wx.onMenuShareAppMessage(shareData)//分享给好友
    wx.onMenuShareQQ(shareData)
    wx.onMenuShareWeibo(shareData)
    wx.onMenuShareTimeline(shareFrieds)//朋友圈
}