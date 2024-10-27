const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const app = express();
const server = http.createServer(app);
const wss = socketIO(server);

// Stelle statische Dateien bereit (z. B. HTML-Dateien)
app.use(express.static('../htdocs/public'));
wss.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    socket.on('join room', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });
  
    socket.on('offer', (offer, roomId) => {
      console.log('offer')
      socket.to(roomId).emit('offer', offer);
    });
  
    socket.on('answer', (answer, roomId) => {
      console.log('answer')
      socket.to(roomId).emit('answer', answer);
    });
  
    socket.on('ice candidate', (candidate, roomId) => {
      socket.to(roomId).emit('ice candidate', candidate);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

// Ändere den Port nach Bedarf
const PORT = 3000;
const IP = "0.0.0.0";
server.listen(PORT, IP, () => {
    console.log(`WebSocket server is running on wss://${IP}:${PORT}`);
});
