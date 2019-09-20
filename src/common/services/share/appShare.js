/**
 * 支持拉勾APP分享组件
 *
 * 开启拉勾APP分享需要向window暴露getShareInfo方法，具体可参考 http://git.lagou.com/lg-web/lg-server-document/blob/master/technical/archive/H5.md
 *
 * [enableAppShare/changeAppShare/disableAppShare description]
 * @param  {Object}   config      [分享信息]
 *     config.shareUrl      {[String]}      [分享的链接]
 *     config.title         {[String]}      [分享的标题]
 *     config.desc          {[String]}      [分享的描述]
 *     config.imgUrl        {[String]}      [分享的图标的URL]
 *     config.picUrl        {[String]}      [分享的图片的URL，可用于分享到朋友圈或QQ空间等（可选）APP v6.1.0起支持]
 *     config.originalId    {[String]}      [分享的小程序的OriginalId（可选）APP v6.1.0起支持]
 *     config.minaTitle     {[String]}      [分享的小程序的标题（可选）APP v6.1.0起支持]
 *     config.minaImgUrl    {[String]}      [分享的小程序的缩略图（可选）APP v6.1.0起支持]
 *     config.minaPath      {[String]}      [分享的小程序的路径（可选）APP v6.1.0起支持]
 * @param  {[Function]} callback  [开启/修改/关闭成功后回调]
 * @return {Object}               [分享信息]
 * 
 */

import extend from 'lodash/extend'

let shareInfo = {}

function deleteData(data) {
    let obj = {};
    Object.keys(data).forEach((key) => {
        if (data[key]) {
            obj[key] = data[key]
        }
    });
    return obj
}

export function enableAppShare(config) {

    shareInfo = extend(shareInfo, config)

    window.getShareInfo = window.getShareInfo || function() {
        return deleteData({
            share_url: shareInfo.shareUrl || window.location.href,
            share_title: shareInfo.title || '',
            share_desc: shareInfo.desc || '',
            share_imgUrl: shareInfo.imgUrl || '',
            share_picUrl: shareInfo.picUrl || '',
            share_minaOriginalId: shareInfo.originalId || '',
            share_minaTitle: shareInfo.minaTitle || '',
            share_minaImgUrl: shareInfo.minaImgUrl || '',
            share_minaPath: shareInfo.minaPath || ''
        })
    }
    return shareInfo
}

export function changeAppShare(config) {
    shareInfo = extend(shareInfo, config)
    return shareInfo
}

export function disableAppShare () {
    delete window.getShareInfo;
    return shareInfo;
}
