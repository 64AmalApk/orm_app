const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/multerMiddleware');


router.get('/profile', upload.none(), userController.getProfile);
router.put('/update-profile', upload.none(), userController.updateProfile);

module.exports = router;
