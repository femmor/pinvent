const express = require('express');
const {
  registerUser,
  loginUser,
  logOut,
  getUserData,
} = require('../controllers/userControllers');
const protectRoute = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logOut);
router.get('/user', protectRoute, getUserData);

module.exports = router;
