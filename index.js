const express = require('express')
const app = express()
const port = 3010
const socket = require('socket.io')

const server = app.listen(port, () => {
    console.log('listening on ' + port)
})

const io = socket(server)

io.on('connection', (socket) => {
    console.log('new client connected')
    socket.on('SEND_MESSAGE', data => {
        io.emit('RECEIVE_MESSAGE', data)
    })
})
