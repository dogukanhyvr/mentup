const express = require('express');
const router = express.Router();
const { saveAvailability } = require('../controllers/availabilitySlotController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/save', verifyToken, saveAvailability);

module.exports = router;