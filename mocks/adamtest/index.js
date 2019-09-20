const Mock = require("mockjs");
module.exports = {
    "GET /entry/testApi": (req, res) => {
        return res.json(Mock.mock({
            "state": 1,
            "message": "成功",
            "content": [{
                "name": "开发|测试|运维类"
            }]
        }))
    }
}
