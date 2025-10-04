const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Register admin (optional, use once and then disable/remove this route)
router.post('/register', register);

// Login admin
router.post('/login', login);

module.exports = router;
