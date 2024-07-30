const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define storage configuration
const storage = multer.diskStorage({
  // Destination function
  destination: (req, file, cb) => {
    // Define upload directory
    const uploadDir = path.join(__dirname, '../uploads');
    
    // Check if directory exists, if not, create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    // Set the destination for file uploads
    cb(null, uploadDir);
  },
  
  // Filename function
  filename: (req, file, cb) => {
    // Generate a unique filename based on timestamp and original file name
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create multer instance with storage configuration
const upload = multer({ 
  storage,
  // Uncomment and configure if needed
  // limits: {
  //   fileSize: 5 * 1024 * 1024 // Limit file size to 5MB
  // },
  // fileFilter: (req, file, cb) => {
  //   // Allow only image files
  //   const allowedTypes = ['image/jpeg', 'image/png'];
  //   if (!allowedTypes.includes(file.mimetype)) {
  //     return cb(new Error('Invalid file type'), false);
  //   }
  //   cb(null, true);
  // }
});

module.exports = upload;
