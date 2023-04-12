// Conexión con el servidor mediante Socket.io
const socket = io();

// Referencias a elementos HTML
const chat = document.getElementById('chat');
const input = document.getElementById('input');

// Agrega un mensaje al chat
function addMessage(message) {
  const p = document.createElement('p');
  p.innerText = message;
  chat.appendChild(p);
}

// Envía el mensaje al servidor cuando se presiona Enter
input.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const message = input.value.trim();
    if (message) {
      socket.emit('message', message);
      input.value = '';
    }
  }
});

// Recibe mensajes del servidor y los agrega al chat
socket.on('message', message => {
  addMessage(message);
});
