const express = require('express');
const multer = require('multer');
const path = require('path');
const { handleReport, storage } = require('./report'); // Pastikan path ini benar

const router = express.Router();
const upload = multer({ storage });

// Middleware for parsing JSON and URL encoded
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Define the report route
router.post('/report', upload.single('image'), handleReport);
router.use('/storage', express.static(path.join(__dirname, '../uploads')));

module.exports = router;
