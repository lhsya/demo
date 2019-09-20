// lagou
window.dataHost = 'a.lagou.com';
(function(i, s, o, g, r, a, m) {
    i['LgAnalytics'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//a.lagou.com/js/a.js', 'gatherer');

gatherer('create', 'UA-41268416-1', {
    'alwaysSendReferrer': true
});
gatherer('send', 'pageview');

//baidu
/*var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F4233e74dff0ae5bd0a3d81c6ccf756e6' type='text/javascript'%3E%3C/script%3E"));*/
var bd_hmt_key = '4233e74dff0ae5bd0a3d81c6ccf756e6';
if (location.hostname == 'yanzhi.lagou.com') {
    bd_hmt_key = '7a53ea85ebffc2dd72e2b7b654bda440';
} else if (location.hostname == 'easy.lagou.com') {
    bd_hmt_key = 'bfa5351db2249abae67476f1ec317000';
}
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement('script');
    hm.src = '//hm.baidu.com/hm.js?' + bd_hmt_key;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
})();

//google analytics
// (function(i, s, o, g, r, a, m) {
//     i['GoogleAnalyticsObject'] = r;
//     i[r] = i[r] || function() {
//         (i[r].q = i[r].q || []).push(arguments);
//     }, i[r].l = 1 * new Date();
//     a = s.createElement(o),
//         m = s.getElementsByTagName(o)[0];
//     a.async = 1;
//     a.src = g;
//     m.parentNode.insertBefore(a, m);
// })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

// ga('create', 'UA-41268416-1', 'auto');
// ga('require', 'displayfeatures');
// ga('require', 'linker');
// ga('send', 'pageview');
