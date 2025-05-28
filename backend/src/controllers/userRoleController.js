const { User } = require('../models');

// Kullanıcı rolünü güncelleme
exports.updateUserRole = async (req, res) => {
  const { userId, newRole } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    user.role = newRole;
    await user.save();

    res.status(200).json({ message: 'Kullanıcı rolü başarıyla güncellendi.', user });
  } catch (error) {
    console.error('Rol güncelleme hatası:', error);
    res.status(500).json({ message: 'Rol güncellenirken bir hata oluştu.' });
  }
};

// Kullanıcı rolünü kontrol etme
exports.getUserRole = async (req, res) => {
  try {
    const userId = req.user.id; // Token'dan kullanıcı ID'sini alın
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    res.status(200).json({ role: user.role });
  } catch (error) {
    console.error('Rol kontrol hatası:', error);
    res.status(500).json({ message: 'Rol kontrol edilirken bir hata oluştu.' });
  }
};