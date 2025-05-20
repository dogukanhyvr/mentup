const { Appointment, User } = require('../models');

// Görüşme talebi oluşturma
exports.createAppointment = async (req, res) => {
  try {
	const { mentor_id, scheduled_at } = req.body;
	const mentee_id = req.user.id; // Giriş yapan mentee'nin ID'si

	// Mentorun varlığını kontrol et
	const mentor = await User.findOne({ where: { id: mentor_id, role: 'mentor' } });
	if (!mentor) {
	  return res.status(404).json({ message: 'Mentor bulunamadı.' });
	}

	// Randevu oluştur
	const appointment = await Appointment.create({
	  mentor_id,
	  mentee_id,
	  scheduled_at,
	  status: 'pending',
	});

	res.status(201).json(appointment);
  } catch (err) {
	console.error('Randevu oluşturulamadı:', err);
	res.status(500).json({ message: 'Randevu oluşturulurken hata oluştu.' });
  }
};

// Görüşme talebi durumunu güncelleme
exports.updateAppointmentStatus = async (req, res) => {
  try {
	const { appointment_id } = req.params;
	const { status } = req.body;

	// Geçerli durumları kontrol et
	const validStatuses = ['pending', 'accepted', 'rejected', 'cancelled', 'completed'];
	if (!validStatuses.includes(status)) {
	  return res.status(400).json({ message: 'Geçersiz durum.' });
	}

	// Randevuyu güncelle
	const appointment = await Appointment.findByPk(appointment_id);
	if (!appointment) {
	  return res.status(404).json({ message: 'Randevu bulunamadı.' });
	}

	appointment.status = status;
	await appointment.save();

	res.status(200).json(appointment);
  } catch (err) {
	console.error('Randevu durumu güncellenemedi:', err);
	res.status(500).json({ message: 'Randevu durumu güncellenirken hata oluştu.' });
  }
};

// Mentorun gelen taleplerini listeleme
exports.getMentorAppointments = async (req, res) => {
  try {
	const mentor_id = req.user.id; // Giriş yapan mentorun ID'si

	const appointments = await Appointment.findAll({
	  where: { mentor_id },
	  include: [
		{ model: User, as: 'mentee', attributes: ['id', 'name', 'surname', 'email'] },
	  ],
	});

	res.status(200).json(appointments);
  } catch (err) {
	console.error('Mentorun randevuları alınamadı:', err);
	res.status(500).json({ message: 'Randevular alınırken hata oluştu.' });
  }
};

// Mentee'nin gönderdiği talepleri listeleme
exports.getMenteeAppointments = async (req, res) => {
  try {
	const mentee_id = req.user.id; // Giriş yapan mentee'nin ID'si

	const appointments = await Appointment.findAll({
	  where: { mentee_id },
	  include: [
		{ model: User, as: 'mentor', attributes: ['id', 'name', 'surname', 'email'] },
	  ],
	});

	res.status(200).json(appointments);
  } catch (err) {
	console.error('Mentee randevuları alınamadı:', err);
	res.status(500).json({ message: 'Randevular alınırken hata oluştu.' });
  }
};