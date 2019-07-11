const socket = {}
const socketio = require('socket.io')
const Message = require('../models/message')

socket.getSocket = (server) => {
  const io = socketio.listen(server)
  io.on('connection', (socket) => {
    socket.on('sendmsg', async (msg) => {
      if (!(msg.from && msg.to)) return next()
      await Message.create(msg, (err, doc) => {
        if (err) return next(err)
        io.emit('getmsg', doc)
      })
    })
  })
}

module.exports = socket