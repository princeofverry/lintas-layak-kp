const express = require('express');
const route = express.Router();

const services = require('../services/render');
const loginController = require('../controllers/loginController');
const reportController = require('../controllers/reportController');
const upload = require('../middlewares/upload');
const path = require('path');

// Serve static files from 'uploads' directory
route.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Render routes
route.get('/', services.homeRoutes);
route.get('/add-user', services.add_user);
route.get('/update-user', services.update_user);

// API routes for users
route.post('/api/users', loginController.create);
route.get('/api/users', loginController.find);
route.put('/api/users/:id', loginController.update);
route.delete('/api/users/:id', loginController.deleteUser);

// Login routes
route.post('/login', loginController.login);

// Report routes
route.post('/report', upload.single('image'), reportController.handleReport);
route.get('/reports', reportController.getReports);
route.get('/reports/:id', reportController.getReportById);
route.put('/reports/:id', reportController.updateReport);
route.get('/reports/search', reportController.getReportByTitleAndEmail);

module.exports = route;
