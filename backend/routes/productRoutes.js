const express = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
} = require('../controllers/productControllers');
const protectRoute = require('../middleware/authMiddleware');
const { upload } = require('../utils/fileUpload');

const router = express.Router();

router.post('/', protectRoute, upload.single('image'), createProduct);
router.get('/', protectRoute, getProducts);
router.get('/:id', protectRoute, getProduct);

module.exports = router;
