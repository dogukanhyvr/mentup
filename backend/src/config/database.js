const { Sequelize } = require('sequelize');
require('dotenv').config(); // .env dosyasını yükle

// Sequelize bağlantısını oluştur
const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT || 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Render SSL için gerekli
    }
  },
  logging: false, // Konsolda SQL sorgularını görmek için true yapabilirsiniz
});

// Bağlantıyı test et
sequelize.authenticate()
  .then(() => {
    console.log('✅ PostgreSQL bağlantısı başarılı!');
  })
  .catch((err) => {
    console.error('❌ PostgreSQL bağlantısı başarısız:', err);
  });

module.exports = sequelize;
