// routes/userRouter.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const upload = require('../middleware/multerMiddleware');

router.get('/check', adminController.check);

module.exports = router;
