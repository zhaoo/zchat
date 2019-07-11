const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))
app.use(require('cors')())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/user', require('./routes/user.js'))
app.use('/message', require('./routes/message.js'))
app.use('/tools', require('./routes/tools.js'))
app.use('/collect', require('./routes/collect.js'))

module.exports = app
