const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const { generateUniqueCode } = require('../utils/generateUniqueCode');
const Report = require('../models/Report');
require('dotenv').config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Handle new report submission
const handleReport = async (req, res) => {
    try {
        const { email, title, content, address } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'File is required' });
        }

        const uniqueCode = generateUniqueCode();
        const fileName = path.basename(file.path); // Hanya nama file
        const fileUrl = `http://localhost:5000/storage/${fileName}`;

        const reportData = {
            email,
            title,
            content,
            address,
            fileUrl,
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
                    filename: fileName,
                    path: file.path,
                    cid: 'reportImage'
                }
            ]
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({
            uniqueCode,
            detections: [],
            num_potholes: 0,
            image: fileUrl, // Kirim URL gambar
        });
    } catch (error) {
        console.error('Error handling report:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Handle updating a report
const updateReport = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            content,
            address,
            status,
            stage,
            priority,
            action,
            responsible,
            estimate
        } = req.body;

        // Validasi ID dan field yang diperlukan
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        const updateFields = { title, content, address, status, stage, priority, action, responsible, estimate };
        
        // Hapus field yang undefined agar tidak mengganggu pembaruan
        Object.keys(updateFields).forEach(key => updateFields[key] === undefined && delete updateFields[key]);

        const report = await Report.findByIdAndUpdate(id, updateFields, { new: true });

        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all reports
const getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get report by ID
const getReportById = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await Report.findById(id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get report by title and email
const getReportByTitleAndEmail = async (req, res) => {
    try {
        const { title, email } = req.query;
        const report = await Report.findOne({ title, email });
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { handleReport, updateReport, getReports, getReportById, getReportByTitleAndEmail };
