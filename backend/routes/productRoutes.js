const express = require('express');
const {
  createProduct,
  getProducts,
} = require('../controllers/productControllers');
const protectRoute = require('../middleware/authMiddleware');
const { upload } = require('../utils/fileUpload');

const router = express.Router();

router.post('/', protectRoute, upload.single('image'), createProduct);
router.get('/', protectRoute, getProducts);

module.exports = router;
