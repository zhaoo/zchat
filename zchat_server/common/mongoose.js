const mongoose = require("mongoose")
const config = require("./config")

mongoose.connect(config.DATABASE.URL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

module.exports = mongoose