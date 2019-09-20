## 文件使用介绍

**1、用于点击日志上报**
```html
<!--
 其中data-lg-webtj-trigger_type、data-lg-webtj-added_props、data-lg-webtj-_ip、data-lg-webtj-_city、data-lg-webtj-_province均为可选属性。
 data-lg-webtj-trigger_type默认值为“clik”，还有一个值为“no”，前者默认点击上报日志，若为后者sdk不会绑定点击上报的事件
-->
<ul>
    <li data-lg-webtj-_address_id="2iF0" data-lg-webtj-_content_id="147" data-lg-webtj-added_props="{p=1,q=1}" data-lg-webtj-trigger_type="click" data-lg-webtj-_ip="192.168.0.1" data-lg-webtj-_city="邯郸" data-lg-webtj-_province="河北">11111</li>
    <li data-lg-webtj-_address_id="2iF0" data-lg-webtj-_content_id="148">11111</li>
</ul>
<script src="https://www.lgstatic.com/common/lg-tongji/js/web_tj/web_tj.js"></script>
<script> 
// 用于统计数据的必需字段
window.PAGE_ID = '2iG0';
 </script>
```
**2、主动上报**

    2.1、通用型上报
    
```html
<script src="https://www.lgstatic.com/common/lg-tongji/js/web_tj/web_tj.js"></script>
<script> // 用于统计数据的必需字段


window.PAGE_ID = '2iG0';
(function() {
 var uploadSource = {
 jobid: '1,2,3,4',
 companyid: '001,002,003,004'
 }
 /**
 * 其中added_props、_ip、_city、_province为可选
 * added_props值为普通对象
 */
 window.LGWebTj({
 added_props: uploadSource,
 _lt: 'justLook',
 _ip: '192.168.0.1',
 _city: '邯郸',
 _province: '河北'
 })
})()
 </script>  
```
    2.2、PV上报（当“_lt”值为“pcpv”或者“h5pv”）
```html
<script src="https://www.lgstatic.com/common/lg-tongji/js/web_tj/web_tj.js"></script>
<script> 
// 用于统计数据的必需字段
window.PAGE_ID = '2iG0';
 
(function() {
 /**
 * 其中_ip、_city、_province为可选
 */
 window.LGWebTj({
 _lt: 'pcpv', // h5pv
 _ip: '192.168.0.1',
 _city: '邯郸',
 _province: '河北'
 })
})()
 </script>
```
    2.3、点击上报（当“_lt”值为“pcclick”或者“h5click”）
```html
<script src="https://www.lgstatic.com/common/lg-tongji/js/web_tj/web_tj.js"></script>
<script> 
// 用于统计数据的必需字段
window.PAGE_ID = '2iG0';
 
var uploadSource = {
 jobid: '1,2,3,4',
 companyid: '001,002,003,004'
}
document.querySelectorAll('a').onclick = function() {
 /**
 * 其中added_props、_ip、_city、_province为可选
 */
 window.LGWebTj({
 _lt: 'pcclick', // h5click
 _address_id: '2iF0',
 _content_id: '147',
 added_props: uploadSource,
 _ip: '192.168.0.1',
 _city: '邯郸',
 _province: '河北'
 })
}
 </script>
```
    2.4、曝光上报（当“_lt”值为“pcshow”或者“h5show”）
```html
<script src="https://www.lgstatic.com/common/lg-tongji/js/web_tj/web_tj.js"></script>
<script> 
// 用于统计数据的必需字段
window.PAGE_ID = '2iG0';
 
var uploadSource = {
 jobid: '1,2,3,4',
 companyid: '001,002,003,004'
}
 
/**
 * 其中added_props、_ip、_city、_province为可选
 */
window.LGWebTj({
 _lt: 'pcshow', // h5show
 _address_id: '2iF0',
 _show_params: {
       search: 'web前端'
 },
 _element_ids: ['147', '148'],
 _element_strategy: [],
 _page_number: 1,
 added_props: uploadSource,
 _ip: '192.168.0.1',
 _city: '邯郸',
 _province: '河北'
})
 
 </script>
```




