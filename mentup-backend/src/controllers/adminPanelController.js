const { where } = require('sequelize');
const { Document, RejectedApplication, User, Profile } = require('../models'); // Profile modelini ekledik

exports.getApplications = async (req, res) => {
  try {
    const applications = await Document.findAll({
      where: {status: 'pending'}, // Sadece pending olan başvuruları al
      attributes: [
        'id',
        'name',
        'surname',
        'email',
        'cv_url',
        'age',
        'degree_number',
        'experience_years',
        'why_mentor',
        'skills',
        'languages',
      ],
      include: [
        {
          model: Profile,
          as: 'profile',
          attributes: ['photo_url'], // Profil resmini al
        },
      ],
    });
    res.status(200).json(applications);
  } catch (err) {
    console.error('Başvurular alınamadı:', err);
    res.status(500).json({ message: 'Başvurular alınırken bir hata oluştu.' });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    // Başvuruyu bul
    const application = await Document.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: 'Başvuru bulunamadı.' });
    }

    // Başvuruyu reddedilenler tablosuna kaydet
    try {
      await RejectedApplication.create({
        name: application.name,
        surname: application.surname,
        email: application.email,
        skills: application.skills,
        languages: application.languages,
      });
    } catch (err) {
      console.error('Reddedilen başvuru kaydedilemedi:', err);
      return res.status(500).json({ message: 'Reddedilen başvuru kaydedilemedi.' });
    }

    // Başvuruyu sil
    await Document.destroy({ where: { id } });

    res.status(200).json({ message: 'Başvuru başarıyla silindi.' });
  } catch (err) {
    console.error('Başvuru silinemedi:', err);
    res.status(500).json({ message: 'Başvuru silinemedi.' });
  }
};

exports.getRejectedApplications = async (req, res) => {
  try {
    const rejectedApplications = await RejectedApplication.findAll();
    res.status(200).json(rejectedApplications);
  } catch (err) {
    console.error('Reddedilen başvurular alınamadı:', err);
    res.status(500).json({ message: 'Reddedilen başvurular alınamadı.' });
  }
};

exports.getApplicationById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const application = await Document.findOne({
        where: { id },
      });
  
      if (!application) {
        return res.status(404).json({ message: 'Başvuru bulunamadı.' });
      }
  
      res.status(200).json(application);
    } catch (err) {
      console.error('Başvuru detayları alınamadı:', err);
      res.status(500).json({ message: 'Başvuru detayları alınırken bir hata oluştu.' });
    }
  };

exports.approveApplication = async (req, res) => {
  try {
    const { id } = req.params;

    // Başvuruyu bul
    const application = await Document.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: 'Başvuru bulunamadı.' });
    }

    // Kullanıcıyı bul ve rolünü mentor olarak güncelle
    const user = await User.findByPk(application.user_id);
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    user.role = 'mentor';
    await user.save();

    // Başvurunun status'unu accepted yap
    application.status = 'accepted';
    await application.save();

    res.status(200).json({ message: 'Başvuru onaylandı ve kullanıcı mentor olarak güncellendi.' });
  } catch (err) {
    console.error('Başvuru onaylanamadı:', err);
    res.status(500).json({ message: 'Başvuru onaylanırken bir hata oluştu.' });
  }
};

exports.rejectApplication = async (req, res) => {
  try {
    const { id } = req.params;

    // Başvuruyu bul
    const application = await Document.findByPk(id);
    if (!application) {
      return res.status(404).json({ message: 'Başvuru bulunamadı.' });
    }

    // Status'u rejected yap
    application.status = 'rejected';
    await application.save();

    res.status(200).json({ message: 'Başvuru reddedildi.' });
  } catch (err) {
    console.error('Başvuru reddedilemedi:', err);
    res.status(500).json({ message: 'Başvuru reddedilirken bir hata oluştu.' });
  }
};