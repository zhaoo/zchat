const func = require("../common/func")
const http = require('http')
const request = require('request')

module.exports = {
    weather: (req, res) => {
        request({
            uri: 'http://apis.juhe.cn/simpleWeather/query?city=' + func.urlencode(req.body.city) + '&key=bbedbc7b06bc5e0cf93b030b0f91f4fe',
            method: 'GET',
            json: 'true'
        }, (err, result, body) => {
            if (body.error_code != 0) {
                res.send({
                    code: 50000,
                    message: body.reason
                })
            } else {
                res.send({
                    code: 20000,
                    message: body.reason,
                    data: body.result
                })
            }
        })
    },
    express: (req, res) => {
        let requesData = "{'OrderCode':'','ShipperCode':'" + func.expressMap('search', req.body.type) + "','LogisticCode':'" + req.body.code + "'}"
        let dataSign = func.urlencode(func.base64(func.md5(requesData + "efd4ecaa-1aae-4de3-a238-a9732db4c921")))
        request({
            uri: 'http://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx?EBusinessID=1550633&RequestType=1002&DataSign=' + dataSign + '&RequestData=' + requesData,
            method: 'GET',
            json: 'true'
        }, (err, result, body) => {
            if (body.Success == false) {
                res.send({
                    code: 50000,
                    message: body.Reason
                })
            } else {
                res.send({
                    code: 20000,
                    data: body.Traces,
                    message: body.Reason
                })
            }
        })
    },
    expressType: (req, res) => {
        const map = func.expressMap('ergodic')
        res.send({
            code: 20000,
            message: '查询快递类型成功',
            data: map
        })
    },
    robot: async (req, res) => {
        request({
            uri: 'http://openapi.tuling123.com/openapi/api/v2',
            method: 'POST',
            json: {
                "reqType": 0,
                "perception": {
                    "inputText": {
                        "text": req.body.msg
                    }
                },
                "userInfo": {
                    "apiKey": "81dbac9579324bbcb01a0d3bcec51618",
                    "userId": "471946"
                }
            }
        }, (err, result, body) => {
            res.send({
                code: 20000,
                message: '机器人请求成功',
                data: body.results
            })
        })
    }
}