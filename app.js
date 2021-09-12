let express = require('express')()
let http = require('http').createServer(express)
let io = require('socket.io')(http)
const shortid = require('shortid')
let {rooms} = require('./bin/Room')

express.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

io.sockets.on('connect', (socket)=>{
    console.log('un nuevo usuario entro con id' + socket.id);
    socket.on('newRoom', ()=>{
        const roomId = shortid.generate()
        rooms.push({
            id: roomId,
            players: []
        })
        console.log('Room created')
    socket.emit('newRoomCreated',{roomId, rooms})
    })
})

//levantar el servidor
http.listen(5000, ()=>{
    console.log('se esta ejecuanto el servidor se esta ejecutando en el puesto 5000');
})
