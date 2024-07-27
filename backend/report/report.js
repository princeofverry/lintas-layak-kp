const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
require('dotenv').config();

// Define Report Schema
const reportSchema = new mongoose.Schema({
  email: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  address: { type: String, required: true },
  fileUrl: { type: String },
  uniqueCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
}, { collection: "ImageDetails" });

const Report = mongoose.model('Report', reportSchema);

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Function to generate unique code based on current date and time
const generateUniqueCode = () => {
  const now = new Date();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = dayNames[now.getDay()];
  const date = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');

  return `${day}-${year}${month}${date}${hour}${minute}${second}`;
};

// Handle Report
const handleReport = async (req, res) => {
  try {
    const { email, title, content, address } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'File is required' });
    }

    const uniqueCode = generateUniqueCode();
    const reportData = {
      email,
      title,
      content,
      address,
      fileUrl: file.path,
      uniqueCode,
    };

    const newReport = new Report(reportData);
    await newReport.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Report Received',
      html: `
        <p>Your report has been received. Here are the details:</p>
        <p><strong>No. Laporan:</strong> ${uniqueCode}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Judul:</strong> ${title}</p>
        <p><strong>Deskripsi:</strong> ${content}</p>
        <p><strong>Lokasi:</strong> ${address}</p>
        <p><strong>Lampiran:</strong></p>
        <img src="cid:reportImage" alt="Report Image" />
        <p>Thank you for your submission.</p>
      `,
      attachments: [
        {
          filename: path.basename(file.path),
          path: file.path,
          cid: 'reportImage' // Content-ID for the image
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    res.status(201).json({
      uniqueCode,
      detections: [],
      num_potholes: 0,
      image: file.path,
    });
  } catch (error) {
    console.error('Error handling report:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { handleReport, storage };
