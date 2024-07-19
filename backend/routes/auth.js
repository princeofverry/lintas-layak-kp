const express = require('express');
const router = express.Router();
const { login } = require('../api/auth/login/login'); // Perbaiki path relatif di sini

router.post('/login', login);

module.exports = router;
