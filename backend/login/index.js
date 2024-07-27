const express = require('express');
const router = express.Router();
const { login } = require('./login');

// Define the login route
router.post('/login', login);

module.exports = router;
