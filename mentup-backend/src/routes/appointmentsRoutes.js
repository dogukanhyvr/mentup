const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointmentController');

router.post('/', AppointmentController.createAppointment);
router.put('/:appointment_id/status', AppointmentController.updateAppointmentStatus);
router.get('/mentor', AppointmentController.getMentorAppointments);
router.get('/mentee', AppointmentController.getMenteeAppointments);

module.exports = router;