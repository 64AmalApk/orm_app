const multer = require('multer');
const path = require('path');
const fs = require('fs');

// check the function to ensure that the uploads directory exists
const ensureUploadsDirectoryExists = () => {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
};


// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // generate unique filename
    }
});


const fileFilter = (req, file, cb) => {
    // Check if the file mimetype is an image
    if (file.mimetype.startsWith('image')) {
        cb(null, true); // Accept the file
    } else {
        cb(new Error('Only image files are allowed'), false); // Reject the file
    }
};


// Call the function to ensure that the uploads directory exists
ensureUploadsDirectoryExists();


// Initialize multer with the storage configuration
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
