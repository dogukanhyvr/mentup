const { AvailabilitySlot } = require('../models');

exports.saveAvailability = async (req, res) => {
  try {
    const { slots } = req.body; // [{date, start_time, end_time}, ...]
    const user_id = req.user.id; // Auth middleware ile alınmalı

    // Önce eski slotları sil (isteğe bağlı)
    await AvailabilitySlot.destroy({ where: { user_id } });

    // Yeni slotları ekle
    const created = await AvailabilitySlot.bulkCreate(
      slots.map(slot => ({
        user_id,
        date: slot.date,
        start_time: slot.start_time,
        end_time: slot.end_time,
      }))
    );

    res.status(200).json({ message: "Müsaitlikler kaydedildi.", slots: created });
  } catch (err) {
    res.status(500).json({ message: "Kayıt sırasında hata oluştu.", error: err.message });
  }
};