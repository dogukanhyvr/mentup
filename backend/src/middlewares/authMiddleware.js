const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token bulunamadı" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Token içindeki kullanıcı bilgisi burada
    next();
  } catch (err) {
    return res.status(403).json({ message: "Geçersiz veya süresi dolmuş token" });
  }
};

exports.isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Yetkilendirme tokenı eksik.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok.' });
    }
    req.user = decoded; // Kullanıcı bilgilerini req nesnesine ekle
    next();
  } catch (error) {
    console.error('Yetkilendirme hatası:', error);
    res.status(401).json({ message: 'Geçersiz token.' });
  }
};
