const express = require('express');
const router = express.Router();
const { getApplications, deleteApplication, getApplicationById, approveApplication, getApplicantsWithProfiles, rejectApplication } = require('../controllers/adminPanelController');

// Tüm başvuruları listeleme
router.get('/applications', getApplications);

// Tekil başvuru detaylarını getirme
router.get('/applications/:id', getApplicationById);

// Başvuru silme
router.delete('/applications/:id', deleteApplication);

// Başvuruyu onaylama
router.put('/applications/:id/approve', approveApplication);

// Başvuruyu reddetme
router.put('/applications/:id/reject', rejectApplication);

module.exports = router;