/**
 *
 * 本文件一般放共用mock数据，不易频繁变动。
 * 开发自己的业务请在local文件中扩展
 */
const glob = require('glob');
const extend = require("extend");
const path = require('path');
const delay = require("mocker-api/utils/delay");

const proxy = {};
glob.sync(path.join(__dirname,"!(mock*).js")).forEach(val => {
    extend(true, proxy, require(val));
});
module.exports = proxy;
