require('dotenv').config(); // .env dosyasını yükler
const express = require('express');
const cors = require('cors');
const app = require('./src/app');
const sequelize = require('./src/config/database'); // Sequelize bağlantı dosyanız
const http = require('http');
const { Server } = require('socket.io');

// PORT
const PORT = process.env.PORT || 5001;

// CORS ayarı
app.use(cors({
  origin: 'https://mentup-frontend.onrender.com', // Render'daki frontend URL'in
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// JSON gövdesini tanı
app.use(express.json());

// HTTP sunucu oluştur
const server = http.createServer(app);

// Socket.IO kurulumu
const io = new Server(server, {
  cors: {
    origin: 'https://mentup-frontend.onrender.com',
    methods: ['GET', 'POST']
  }
});

// Socket olayları
io.on('connection', (socket) => {
  console.log('Kullanıcı bağlandı:', socket.id);

  socket.on('disconnect', () => {
    console.log('Kullanıcı ayrıldı:', socket.id);
  });

  socket.on('callUser', (data) => {
    io.to(data.userToCall).emit('incomingCall', {
      signal: data.signalData,
      from: data.from,
      name: data.name
    });
  });

  socket.on('answerCall', (data) => {
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

// Veritabanını senkronize et ve sunucuyu başlat
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synchronized successfully.');

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
})();
