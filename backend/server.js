require('dotenv').config(); // .env dosyasını yükle
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const sequelize = require('./src/config/database'); // Sequelize bağlantı dosyası
const app = require('./src/app');

const PORT = process.env.PORT || 5001;

// 🔹 1. CORS yapılandırması
const allowedOrigins = [
  'http://localhost:3000', // Geliştirme ortamı için
  'https://mentup-frontend.onrender.com' // Render'daki frontend adresin
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🔹 2. JSON verilerini parse etmek için
app.use(express.json());

// 🔹 3. Basit kök route kontrolü (isteğe bağlı)
app.get('/', (req, res) => {
  res.send('MentUp backend çalışıyor 🚀');
});

// 🔹 4. HTTP sunucusu ve Socket.IO entegrasyonu
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('🔌 Kullanıcı bağlandı:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Kullanıcı ayrıldı:', socket.id);
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

// 🔹 5. Veritabanı senkronizasyonu ve sunucu başlatma
(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('✅ Veritabanı senkronize edildi.');

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Sunucu çalışıyor: http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Veritabanı hatası:', error);
  }
})();
