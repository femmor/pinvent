const express = require('express');
const { createProduct } = require('../controllers/productControllers');
const protectRoute = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protectRoute, createProduct);

module.exports = router;
