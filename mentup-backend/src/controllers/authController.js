const { User, userProfile } = require('../models');
const bcrypt = require('bcrypt'); // bcrypt kütüphanesini ekle
const EmailService = require('../services/EmailService');

// Login işlemi
const jwt = require('jsonwebtoken');
require('dotenv').config(); // .env dosyasını okuyabilmesi için

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                // ✅ JWT token oluştur
                const token = jwt.sign(
                    { id: user.id, ehmail: user.email, name: user.name }, // payload
                    process.env.JWT_SECRET,
                    { expiresIn: '2h' } // Token 2 saat geçerli
                );

                return res.status(200).json({
                    message: 'Giriş başarılı!',
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        role: user.role // Rolü döndürüyoruz
                    }
                });
            }
        }

        res.status(401).json({ message: 'Hatalı e-posta veya şifre!' });
    } catch (error) {
        console.error('Login hatası:', error);
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
};


// Signup işlemi
exports.signup = async (req, res) => {
    const { 
        name, 
        surname, 
        email, 
        password, 
        passwordAgain } = req.body;
  
    try {
      console.log('Gelen Body:', req.body);
  
      // Tüm alanlar dolu mu kontrolü
      if (!name || !surname || !email || !password ) {
        return res.status(400).json({ message: 'Tüm alanları doldurun!' });
      }
  
      // E-posta zaten kayıtlı mı?
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({
          message: 'Bu e-posta adresi zaten kayıtlı!',
        });
      }
  
      // Şifreyi hashle 
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Yeni kullanıcı oluştur
      const newUser = await User.create({
        name,
        surname,
        email,
        password: hashedPassword,
        role: 'mentee'
      });
  
      res.status(201).json({
        message: 'Kayıt başarılı!',
        user: {
          id: newUser.id,
          name: newUser.name,
          surname: newUser.surname,
          email: newUser.email
        }
      });
    } catch (error) {
      console.error('🔴 FULL SIGNUP ERROR ▶', {
        message: error.message,
        parent: error.parent && error.parent.message,
        stack: error.stack
      });
      return res.status(500).json({
        message: 'Bir hata oluştu',
        error: error.message,
        detail: error.parent && error.parent.message
      });
    }
  };

exports.logout = async (req, res) => {
  try {
    // İsteğe bağlı: Token'ı bir kara listeye ekleyebilirsiniz
    // Örneğin: Kara listeyi bir veritabanında veya bellek içinde tutabilirsiniz

    res.status(200).json({ message: 'Çıkış yapıldı.' });
  } catch (err) {
    console.error('Çıkış işlemi sırasında hata:', err);
    res.status(500).json({ message: 'Çıkış işlemi sırasında bir hata oluştu.' });
  }
};

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(404).json({ message: 'Böyle bir e-posta kayıtlı değil.' });

  // 1️⃣ Token üret (payload: userId)
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // 2️⃣ Frontend’deki reset-password sayfanıza yönlendiren link
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  // 3️⃣ Maili yolla
  await EmailService.send(
    email,
    'MentUp: Şifre Sıfırlama',
    `<p>Şifreni sıfırlamak için <a href="${resetLink}">buraya tıklayın</a>.`
    + ` Bu link <strong>${process.env.JWT_EXPIRES_IN}</strong> içinde geçerlidir.</p>`
  );

  return res.json({ message: 'Şifre sıfırlama linki e-postanıza gönderildi.' });
};

// 2) Yeni şifreyi kaydetme (token’lı endpoint)
exports.resetPassword = async (req, res) => {
  // 1) Token’ı al: hem body’den, hem query’den deneyin
  const token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({ message: 'Token gönderilmedi.' });
  }

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res
      .status(400)
      .json({ message: 'Geçerli veya süresi dolmuş token.' });
  }

  // 2) Yeni şifreleri al ve kontrol et
  const { password, passwordAgain } = req.body;
  if (!password || password !== passwordAgain) {
    return res.status(400).json({ message: 'Şifreler eşleşmiyor.' });
  }

  // 3) Kullanıcıyı bul ve şifreyi güncelle
  try {
    const user = await User.findByPk(payload.userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }
    const hashed = await bcrypt.hash(password, 10);
    await user.update({ password: hashed });
    return res.status(200).json({ message: 'Şifre değiştirildi.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Sunucu hatası.' });
  }
};


