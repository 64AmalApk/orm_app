const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const upload = require('../middleware/multerMiddleware');

router.post('/register', upload.none(), authController.registerAuth);
router.post('/login', upload.none(), authController.loginAuth);

module.exports = router;
