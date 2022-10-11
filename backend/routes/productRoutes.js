const express = require('express');
const { createProduct } = require('../controllers/productControllers');
const protectRoute = require('../middleware/authMiddleware');
const { upload } = require('../utils/fileUpload');

const router = express.Router();

router.post('/', protectRoute, upload.single('image'), createProduct);

module.exports = router;
