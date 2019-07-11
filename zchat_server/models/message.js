const mongoose = require('../common/mongoose')

const MessageSchema = new mongoose.Schema({
    from: String,
    to: String,
    content: String,
    time: {
        type: Date,
        default: Date.now
    },
    is_read: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Message', MessageSchema)