const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const axios = require('axios');
const FormData = require('form-data');
const { generateUniqueCode } = require('../utils/generateUniqueCode');
const Report = require('../models/Report');
const mongoose = require('mongoose');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const detectPotholes = async (filePath) => {
    const formData = new FormData();
    formData.append('image', fs.createReadStream(filePath));
    try {
        const detectResponse = await axios.post('http://127.0.0.1:5000/detect', formData, {
            headers: formData.getHeaders(),
        });
        return detectResponse.data;
    } catch (error) {
        throw error;
    }
};

const handleReport = async (req, res) => {
    try {
        const { email, title, content, address, kelurahan, kecamatan, latitude, longitude } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'File is required' });
        }

        const detectionResult = await detectPotholes(file.path);
        const lubang = detectionResult.num_potholes || 0;

        const uniqueCode = generateUniqueCode();
        const fileName = path.basename(file.path);
        const fileUrl = fileName;

        const reportData = {
            email,
            title,
            content,
            address,
            kelurahan,
            kecamatan,
            latitude,
            longitude,
            fileUrl,
            uniqueCode,
            lubang,
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
                <p><strong>Judul Laporan:</strong> ${title}</p>
                <p><strong>Isi Laporan:</strong> ${content}</p>
                <p><strong>Alamat / Deskripsi Lokasi:</strong> ${address}</p>
                <p><strong>Latitude:</strong> ${latitude}</p>
                <p><strong>Longitude:</strong> ${longitude}</p>
                <p><strong>Jumlah Lubang:</strong> ${lubang}</p>
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
            detections: detectionResult.detections || [],
            lubang,
            image: fileUrl,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const updateReport = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const {
            title,
            content,
            address,
            status,
            stage,
            priority,
            action,
            responsible,
            estimate,
            notes,
        } = req.body;

        const updateFields = { title, content, address, status, stage, priority, action, responsible, estimate, notes };
        Object.keys(updateFields).forEach(key => updateFields[key] === undefined && delete updateFields[key]);

        const report = await Report.findByIdAndUpdate(id, updateFields, { new: true });

        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }

        res.status(200).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

const getReportByUniqueCode = async (req, res) => {
    try {
        const { uniqueCode } = req.params;
        const report = await Report.findOne({ uniqueCode });
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReports = async (req, res) => {
    try {
        const reports = await Report.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReportById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const report = await Report.findById(id);
        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReportByTitleAndEmail = async (req, res) => {
    try {
        const { title, email } = req.query;
        const reports = await Report.find({
            title: { $regex: title, $options: 'i' },
            email: { $regex: email, $options: 'i' },
        });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReportCountByKecamatan = async (req, res) => {
    try {
        const reportCounts = await Report.aggregate([
            {
                $group: {
                    _id: "$kecamatan",
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    kecamatan: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);

        res.status(200).json(reportCounts);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

module.exports = {
    handleReport,
    updateReport,
    getReportByUniqueCode,
    getReports,
    getReportById,
    getReportByTitleAndEmail,
    getReportCountByKecamatan,
};
