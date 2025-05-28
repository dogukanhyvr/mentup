const express = require('express');
const router = express.Router();
const { saveAvailability, getAvailability, getMentorAvailability } = require('../controllers/availabilitySlotController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/save', verifyToken, saveAvailability);

// Daha anlamlı endpoint:
router.get('/getAvailability', verifyToken, getAvailability);

router.get('/getMentorAvailability/:user_id', verifyToken, getMentorAvailability);

module.exports = router;