const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointmentController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/createAppointment', verifyToken, AppointmentController.createAppointment);
router.put('/:appointment_id/status', verifyToken, AppointmentController.updateAppointmentStatus);
router.get('/getMentorAppointmentRequest', verifyToken, AppointmentController.getMentorAppointments);
router.get('/getMenteeAppointmentRequest', verifyToken, AppointmentController.getMenteeAppointments);

module.exports = router;