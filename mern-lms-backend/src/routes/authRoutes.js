const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Register new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

module.exports = router;