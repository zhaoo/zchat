const Message = require('../models/message')
const User = require('../models/user')

module.exports = {
	getMessageByUid: async (req, res) => {
		const uid = req.body.uid
		let doc = await Message.find({
			$or: [{
				from: uid
			}, {
				to: uid
			}]
		})
		let msg = {}
		for (item of doc) {
			if (item.from == uid) {
				if (!msg[item.to])
					msg[item.to] = {
						sum: 0,
						content: '',
						time: '',
						fid: ''
					}
				if (item.is_read == false)
					msg[item.to].sum++
				msg[item.to].content = item.content
				msg[item.to].time = item.time
				msg[item.to].fid = item.to
			} else {
				if (!msg[item.from])
					msg[item.from] = {
						sum: 0,
						content: '',
						time: '',
						fid: ''
					}
				if (item.is_read == false)
					msg[item.from].sum++
				msg[item.from].content = item.content
				msg[item.from].time = item.time
				msg[item.from].fid = item.from
			}
		}
		for (item in msg) {
			let user = await User.findById(item)
			msg[item].nickname = user.nickname
			msg[item].avatar = user.avatar
		}
		res.send({
			code: 20000,
			message: "获取消息列表成功",
			data: msg
		})
	},
	getMessageByFid: async (req, res) => {
		const fid = req.body.fid
		let doc = await Message.find({
			$or: [{
				from: fid
			}, {
				to: fid
			}]
		})
		res.send({
			code: 20000,
			message: "获取消息列表成功",
			data: doc
		})
	},
	updateRead: async (req, res) => {
		await Message.findByIdAndUpdate(req.body.id, {
			is_read: true
		})
		res.send({
			code: 20000,
			message: "消息设置为已读"
		})
	},
	deleteMsg: async (req, res) => {
		await Message.findByIdAndDelete(req.body.id)
		res.send({
			code: 20000,
			message: "删除成功"
		})
	},
	search: async (req, res) => {
		const keyword = req.body.keyword
		const uid = req.body.uid
		let user = await User.findOne({
			$or: [{
				username: keyword
			}, {
				nickname: keyword
			}]
		}) || {
			_id: ''
		}
		let search = await Message.find({
			$or: [{
				from: uid
			}, {
				to: uid
			}],
			$or: [{
				content: {
					$regex: keyword
				}
			}, {
				from: user._id
			}, {
				to: user._id
			}]
		})
		let message = []
		if (search) {
			for (item of search) {
				let userinfo = await User.findById(item.from)
				message.push({
					nickname: userinfo.nickname,
					avatar: userinfo.avatar,
					content: item.content,
					_id: item._id,
					time: item.time,
					from: item.from,
					to: item.to
				})
			}
		}
		res.send({
			code: 20000,
			message: "搜索成功",
			data: message
		})
	}
}