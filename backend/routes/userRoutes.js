const express = require('express');
const {
  registerUser,
  loginUser,
  logOut,
  getUserData,
  getLogInStatus,
} = require('../controllers/userControllers');
const protectRoute = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logOut);
router.get('/user', protectRoute, getUserData);
router.get('/loginStatus', getLogInStatus);

module.exports = router;
