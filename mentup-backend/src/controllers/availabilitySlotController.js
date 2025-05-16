const { AvailabilitySlot } = require('../models');

exports.saveAvailability = async (req, res) => {
  try {
    const { slots } = req.body;
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).json({ message: "Kullanıcı doğrulanamadı." });
    }

    // Eski slotları sil
    await AvailabilitySlot.destroy({ where: { user_id } });

    // Saatleri HH:mm formatında kaydet
    const created = await AvailabilitySlot.bulkCreate(
      slots.map(slot => ({
        user_id,
        date: slot.date,
        start_time: slot.start_time.slice(0, 5), // "10:00"
        end_time: slot.end_time.slice(0, 5),     // "11:00"
      }))
    );

    res.status(200).json({ message: "Müsaitlikler kaydedildi.", slots: created });
  } catch (err) {
    console.error("Müsaitlik kaydı hatası:", err);
    res.status(500).json({ message: "Kayıt sırasında hata oluştu.", error: err.message });
  }
};

exports.getAvailability = async (req, res) => {
  try {
    const user_id = req.user?.id;
    if (!user_id) {
      return res.status(401).json({ message: "Kullanıcı doğrulanamadı." });
    }
    const slots = await AvailabilitySlot.findAll({ where: { user_id } });
    res.status(200).json({ slots });
  } catch (err) {
    console.error("Müsaitlikleri getirirken hata:", err);
    res.status(500).json({ message: "Slotlar alınamadı.", error: err.message });
  }
};