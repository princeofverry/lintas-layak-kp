const express = require('express');
const route = express.Router();
const loginController = require('../controllers/loginController');
const reportController = require('../controllers/reportController');
const upload = require('../middlewares/upload');
const path = require('path');

// Serve static files from 'uploads' directory
route.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// Login routes
route.post('/login', loginController.login);

// Report routes
route.post('/report', upload.single('image'), reportController.handleReport);
route.get('/reports', reportController.getReports);
route.get('/reports/:id', reportController.getReportById);
route.put('/reports/:id', reportController.updateReport);
route.get('/reports/search', reportController.getReportByTitleAndEmail);
route.get('/report/uniqueCode/:uniqueCode', reportController.getReportByUniqueCode);
route.get('/report/count-by-kecamatan', reportController.getReportCountByKecamatan);

module.exports = route;
