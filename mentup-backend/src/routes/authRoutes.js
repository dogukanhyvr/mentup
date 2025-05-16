const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validate');
const { signupValidation, loginValidation } = require('../services/userValidation');
const { logout } = require('../controllers/authController');

// Signup route
router.post('/signup', validate(signupValidation), authController.signup);

// Login route
router.post('/login', validate(loginValidation), authController.login);

// Çıkış yapma
router.post('/logout', logout);

router.post('/request-reset', authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);


module.exports = router;