const express = require('express');
const router = express.Router();
const { saveAvailability } = require('../controllers/availabilityController');
const auth = require('../middleware/auth'); // JWT veya session auth

router.post('/save', auth, saveAvailability);

module.exports = router;