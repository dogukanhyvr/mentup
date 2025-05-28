require('dotenv').config(); // .env dosyasını yükler
const app = require('./src/app');
const sequelize = require('./src/config/database'); // Sequelize bağlantı dosyanız
const http = require('http');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 5001; // .env dosyasındaki PORT'u kullanır

const server = http.createServer(app); // express app'i HTTP sunucuya sar

// Socket.IO kurulumu
const io = new Server(server, {
  cors: {
    origin: "*", // test aşamasında her yerden erişim
    methods: ["GET", "POST"]
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

// Veritabanını senkronize et
(async () => {
  try {
    await sequelize.sync({ force: false }); // force: true tüm tabloları sıfırlar, dikkatli kullanın
    console.log('Database synchronized successfully.');

    // Sunucuyu başlat
    server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
})();
