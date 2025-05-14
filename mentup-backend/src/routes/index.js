const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const profileRoutes = require('./profileRoutes');
const applyMentorshipRoutes = require('./applyMentorshipRoutes');
const adminPanelRoutes = require('./adminPanelRoutes');
const userRoleRoutes = require('./userRoleRoutes');

// Health-check
router.get('/', (req, res) => {
  res.send('API is working');
});

// Auth işlemleri (signup, login, profile)
router.use('/auth', authRoutes);

router.use('/profile', profileRoutes);

router.use('/mentor', applyMentorshipRoutes);

router.use('/admin', adminPanelRoutes);

// Kullanıcı rolleriyle ilgili işlemler
router.use('/user-role', userRoleRoutes);

module.exports = router;
