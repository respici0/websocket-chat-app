const express = require('express')
const socket = require('socket.io')

// App setup
const app = express()

// port setup
const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))
const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// Static files
app.use(express.static("public"))

// Socket setup
const io = socket(server);

io.on("connection", (socket)=> {
    // console.log("Made socket connection", socket.id)
    socket.on('chat', (data)=> io.sockets.emit('chat', data));

    socket.on('typing', data => {
        console.log(data);
        socket.broadcast.emit("typing", data)
    });
})

