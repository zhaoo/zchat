const mongoose = require('../common/mongoose')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	password: String,
	nickname: String,
	avatar: [{
		content: String,
		file: {}
	}],
	email: String,
	intro: String,
	sex: String,
	last_login_time: {
		type: Date,
		default: Date.now
	},
})

module.exports = mongoose.model('User', UserSchema)