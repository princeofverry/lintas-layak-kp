const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define storage configuration
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
