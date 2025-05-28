const express = require('express');
const router = express.Router();
const { updateUserRole, getUserRole } = require('../controllers/userRoleController');
const { isAdmin, verifyToken } = require('../middlewares/authMiddleware');

// Kullanıcı rolünü güncelleme (sadece admin erişimi)
router.put('/update-role', isAdmin, updateUserRole);

// Kullanıcı rolünü kontrol etme
router.get("/role", verifyToken, getUserRole);

module.exports = router;