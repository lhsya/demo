const Mock = require("mockjs");

module.exports = {
    "GET /activityapi/basic/ifLogin": (req, res) => {
        return res.json(Mock.mock({
            state: 1,
            message: '',
            content: {}
        }));
    }
};