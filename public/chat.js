// Make connection

const socket = io.connect("http://localhost:3000");

// Query DOM

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output')
const feedback = document.getElementById('feedback');
const inputMsg = document.getElementById('message');

// Emit events


btn.addEventListener('click', ()=> {
    socket.emit("chat", {
        message: message.value,
        handle: handle.value
    })
}, true)

window.addEventListener('keypress', (e) => {
    if (e.keyCode === 13) {
     socket.emit("chat", {
        message: message.value,
        handle: handle.value
    })
    }
}, false)

message.addEventListener('keypress', ()=> {
    socket.emit('typing', { 
        handle: handle.value 
    })
})

// Listen for events
socket.on("chat", (data)=> {
    feedback.innerHTML = "";
    inputMsg.value = "";
    output.innerHTML += `<p><strong> ${data.handle}: </strong> ${data.message}
</p>`})

socket.on("typing", (data)=> {
    feedback.innerHTML = `<p><em> ${data.handle} is typing a message... </em></p>`
})
