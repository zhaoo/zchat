const socket = {}
const socketio = require('socket.io')
const Message = require('../models/message')
const func = require("../common/func")

socket.getSocket = (server) => {
  const io = socketio.listen(server)
  io.on('connection', (socket) => {
    socket.on('sendmsg', async (msg) => {
      msg.content = func.aesDecrypt(msg.content)
      if (!(msg.from && msg.to)) return next()
      await Message.create(msg, (err, doc) => {
        if (err) return next(err)
        doc.content = func.aesEncrypt(doc.content)
        io.emit('getmsg', doc)
      })
    })
  })
}

module.exports = socket