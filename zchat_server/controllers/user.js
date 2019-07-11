const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require("../common/config")
const func = require("../common/func")

module.exports = {
    login: async (req, res) => {
        const user = await User.findOne({
            username: req.body.username
        })
        if (!user) {
            res.send({
                code: 50000,
                message: "用户名错误"
            })
        } else {
            if (user.password != func.md5(req.body.password)) {
                res.send({
                    code: 50000,
                    message: "密码错误"
                })
            } else {
                const token = jwt.sign({
                    id: user._id
                }, config.SECRET)
                res.send({
                    code: 20000,
                    message: "登录成功",
                    data: {
                        token: token
                    }
                })
                await User.findByIdAndUpdate(user._id, {
                    last_login_time: Date.now()
                })
            }
        }
    },
    info: async (req, res) => {
        const {
            id
        } = jwt.verify(req.get("X-Token"), config.SECRET)
        const user = await User.findById(id)
        res.send({
            code: 20000,
            message: "获取用户信息成功",
            data: user
        })
    },
    logout: async (req, res) => {
        res.send({
            code: 20000,
            message: "注销成功"
        })
    },
    register: async (req, res) => {
        const param = {
            username: req.body.username,
            password: func.md5(req.body.password),
            nickname: req.body.username,
            email: req.body.email,
            avatar: [{content: config.DEFAULT_AVATAR}],
            roles: ['user']
        }
        await User.create(param, (err) => {
            if (err) return next(err)
            res.send({
                code: 20000,
                message: "注册用户成功"
            })
        })
    },
    getList: async (req, res) => {
        User.find((err, data) => {
            res.send({
                code: 20000,
                message: "获取用户列表成功",
                data: {
                    items: data,
                }
            })
        })
    },
    getUserByUid: async (req, res) => {
        await User.findById(req.body.uid).then((doc) => {
            res.send({
                code: 20000,
                message: "获取用户列表成功",
                data: doc
            })
        })
    },
    profile: async (req, res) => {
        let user = req.body
        if(!(user.oldPwd || user.newPwd || user.verifyPwd)) {
            await User.findByIdAndUpdate(user.id, user).then(() => {
                res.send({
                    code: 20000,
                    message: "修改用户信息成功"
                })
            })
        } else {
            if (user.newPwd !== user.verifyPwd) {
                res.send({
                    code: 50000,
                    message: "两次输入密码不正确"
                })
                return
            }
            await User.findById(user.id).then(async (doc) => {
                if (doc.password !== func.md5(user.oldPwd)) {
                    res.send({
                        code: 50000,
                        message: "旧密码错误"
                    })
                    return
                }
                user.password = func.md5(user.newPwd)
                await User.findByIdAndUpdate(user.id, user).then(() => {
                    res.send({
                        code: 20000,
                        message: "修改用户信息成功"
                    })
                })
            })
        }
    },
    search: async (req, res) => {
        const keyword = req.body.keyword
		let user = await User.find({
			$or: [{
				username: keyword
			}, {
				nickname: keyword
			}]
        })
        res.send({
			code: 20000,
			message: "搜索成功",
			data: user
		})
    },
    deleteUser: async (req, res) => {
        await User.findByIdAndDelete(req.body.uid)
        res.send({
			code: 20000,
			message: "删除成功"
		})
    }
}