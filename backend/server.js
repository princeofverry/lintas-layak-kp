const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const reportRoutes = require('./routes/reports');
const connectDB = require('./config/index');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Ganti dengan alamat frontend Anda
  credentials: true
}));

app.use(express.json());
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Harus false jika tidak menggunakan HTTPS
}));

app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
