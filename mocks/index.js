/**
 *
 * 本文件一般放共用mock数据，不易频繁变动。
 * 开发自己的业务请在local文件中扩展
 */
const extend = require("extend");
const delay = require("mocker-api/utils/delay");

const proxy = {
    "GET /activityapi/basic/ifLogin": (req, res) => {
        const { owner, repo, ref } = req.params;
        return res.json({
            success: true,
            state: 200
        });
    },
    "GET /activityapi/basic/appAutoLogin.json": (req, res) => {
        const { owner, repo, ref } = req.params;
        return res.json({
            success: true,
            state: 200
        });
    },
    "GET /activityapi/basic/hasOpenId": (req, res) => {
        const { owner, repo, ref } = req.params;
        return res.json({
            success: true,
            state: 200
        });
    },
    
    /*
    _proxy: {
        proxy: {
            "/jobs/companyAjax.json": "https://www.lagou.com",
        },
        //changeHost: true,
    },
    "GET /api/hello": (req, res) => {
        return res.json({
            "text": "this is from mock server"
        });
    },

    "POST /api/login/account": (req, res) => {
        const { password, username } = req.body;
        if (password === "888888" && username === "admin") {
            return res.json({
                status: "ok",
                code: 0,
                token: "sdfsdfsdfdsf",
                data: {
                    id: 1,
                    username: "kenny",
                    sex: 6
                }
            });
        } else {
            return res.json({
                status: "error",
                code: 403
            });
        }
    },
    "GET /api/:owner/:repo/raw/:ref/(.*)": (req, res) => {
        const { owner, repo, ref } = req.params;
        // http://localhost:8081/api/admin/webpack-mock-api/raw/master/add/ddd.md
        // owner => admin
        // repo => webpack-mock-api
        // ref => master
        // req.params[0] => add/ddd.md
        return res.json({
            id: 3,
            owner, repo, ref,
            path: req.params[0]
        });
    },
    */
   "GET /activityapi/basic/ifLogin": (req, res) => {
        return res.json({
            success: true,
            state: 200
        });
   }
};
module.exports = delay(extend({}, proxy, inde_history, hotEmployee, 100));
