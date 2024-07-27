const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./config/index');
const loginRoutes = require('./login/index');
const reportRoutes = require('./report/index'); // Update path to point to report/index.js
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true // Necessary to send cookies
}));

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true } // Set secure to true if using HTTPS
}));

app.use('/backend/login', loginRoutes);
app.use('/backend/report', reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
