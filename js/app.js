// Conexión con el servidor mediante Socket.io
const socket = io();

// Referencias a elementos HTML
const chat = document.querySelector('.chat-messages');
const input = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.chat-input button');
const modal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.modal-close');
const modalBackground = document.querySelector('.modal-background');
const modalButtons = document.querySelectorAll('.modal-content button');

// Agrega un mensaje al chat
function addMessage(message) {
  const p = document.createElement('p');
  p.innerText = message;
  chat.appendChild(p);
}

// Envía el mensaje al servidor cuando se presiona el botón "Enviar"
sendButton.addEventListener('click', () => {
  const message = input.value.trim();
  if (message) {
    socket.emit('message', message);
    input.value = '';
  }
});

// Envía el mensaje al servidor cuando se presiona la tecla "Enter"
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

// Mostrar el modal cuando se hace clic en el botón de "Más"
const showMoreModal = () => {
  modal.classList.add('active');
}

// Ocultar el modal cuando se hace clic en el botón de cerrar o en el fondo oscuro
const hideModal = () => {
  modal.classList.remove('active');
}

modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    console.log(`Button "${button.innerText}" was clicked.`);
    hideModal();
  });
});

modalCloseButton.addEventListener('click', () => {
  hideModal();
});

modalBackground.addEventListener('click', () => {
  hideModal();
});

document.querySelector('.btn-mas .mas').addEventListener('click', () => {
  showMoreModal();
});


const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Agrega esta línea para servir la biblioteca de Socket.io
app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

http.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});
