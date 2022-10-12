const express = require('express');
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/productControllers');
const protectRoute = require('../middleware/authMiddleware');
const { upload } = require('../utils/fileUpload');

const router = express.Router();

router.post('/', protectRoute, upload.single('image'), createProduct);
router.patch('/:id', protectRoute, upload.single('image'), updateProduct);
router.get('/', protectRoute, getProducts);
router.get('/:id', protectRoute, getProduct);
router.delete('/:id', protectRoute, deleteProduct);

module.exports = router;
