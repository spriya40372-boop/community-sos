const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, { 
  cors: { origin: "*" } 
});

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  console.log('⚡ New user connected:', socket.id);

  socket.on('trigger_sos', (data) => {
    console.log('🚨 SOS Alert Received:', data);
    io.emit('broadcast_sos', data);
  });

  socket.on('send_chat', (data) => {
    io.emit('receive_chat', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('✅ Server running! Open http://localhost:3000 in your browser.');
});