const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Report = require('../models/report'); // Sesuaikan path dengan struktur project Anda

// Setup multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/backend/storage/uploads'); // Define your upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename
  }
});
const upload = multer({ storage });

router.post('/', upload.single('file'), async (req, res) => {
  try {
    const { email, title, content, address } = req.body;
    const file = req.file;

    const uniqueCode = `REPORT-${new Date().toISOString().replace(/[^0-9]/g, '')}`;

    const newReport = new Report({
      email,
      title,
      content,
      address,
      fileUrl: file ? `/uploads/${file.filename}` : null,
      uniqueCode
    });

    await newReport.save();
    res.status(201).json({ message: 'Report submitted successfully', uniqueCode });
  } catch (error) {
    console.error('Error submitting report', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
