const mongoose = require('../common/mongoose')

const CollectSchema = new mongoose.Schema({
	uid: String,
	from: String,
	to: String,
	content: String,
	time: Date,
	collect_time: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('Collect', CollectSchema)