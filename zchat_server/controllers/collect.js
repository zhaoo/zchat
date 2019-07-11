const Collect = require('../models/collect')
const User = require('../models/user')

module.exports = {
	createCollect: async (req, res) => {
		param = req.body
		await Collect.create(param, (err) => {
			if (err) return next(err)
			res.send({
				code: 20000,
				message: "添加收藏成功"
			})
		})
	},
	getCollectByUid: async (req, res) => {
		let doc = await Collect.find({
			uid: req.body.uid
		})
		let collect = []
		for (item of doc) {
			let user = await User.findById(item.from)
			collect.push({
				nickname: user.nickname,
				avatar: user.avatar,
				from: item.from,
				to: item.to,
				uid: item.uid,
				content: item.content,
				_id: item._id,
				time: item.time,
				collect_time: item.collect_time
			})
		}
		res.send({
			code: 20000,
			message: "获取收藏列表成功",
			data: collect
		})
	},
	getCollectById: async (req, res) => {
		if (req.body.id) {
			await Collect.findById(req.body.id).then(async (doc) => {
				let user = await User.findById(doc.from)
				let collect = {
					nickname: user.nickname,
					avatar: user.avatar,
					content: doc.content,
					_id: doc._id,
					time: doc.time
				}
				res.send({
					code: 20000,
					message: "获取收藏详情成功",
					data: collect
				})
			})
		} else {
			res.send({
				code: 50000,
				message: "未选择收藏"
			})
		}
	},
	search: async (req, res) => {
		const keyword = req.body.keyword
		let user = await User.findOne({
			$or: [{
				username: keyword
			}, {
				nickname: keyword
			}]
		}) || {
			_id: ''
		}
		let search = await Collect.find({
			uid: req.body.uid,
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
		let collect = []
		if (search) {
			for (item of search) {
				let userinfo = await User.findById(item.from)
				collect.push({
					nickname: userinfo.nickname,
					avatar: userinfo.avatar,
					content: item.content,
					_id: item._id,
					time: item.time
				})
			}
		}
		res.send({
			code: 20000,
			message: "搜索成功",
			data: collect
		})
	}
}