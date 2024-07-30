const express = require('express');
const session = require('express-session');
const cors = require('cors');
const connectDB = require('./config/index');
const routes = require('./routes/routes');
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
  cookie: {
    secure: false, // Set to true in production if using HTTPS
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  }
}));

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
