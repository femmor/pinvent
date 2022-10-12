const express = require('express');
const protectRoute = require('../middleware/authMiddleware');
const { contactUs } = require('../controllers/contactController');

const router = express.Router();

router.post('/', protectRoute, contactUs);

module.exports = router;
