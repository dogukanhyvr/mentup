const express = require('express');
const router = express.Router();
const { saveAvailability, getAvailability } = require('../controllers/availabilitySlotController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/save', verifyToken, saveAvailability);

// Daha anlamlı endpoint:
router.get('/getAvailability', verifyToken, getAvailability);

module.exports = router;