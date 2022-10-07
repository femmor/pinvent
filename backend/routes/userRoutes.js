const express = require('express');
const {
  registerUser,
  loginUser,
  logOut,
  getUsers,
  getUserData,
  getLogInStatus,
  updateUser,
  changePassword,
  forgotPassword,
  resetPassword,
} = require('../controllers/userControllers');
const protectRoute = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logOut);
router.get('/', protectRoute, getUsers);
router.get('/user', protectRoute, getUserData);
router.get('/loginStatus', getLogInStatus);
router.patch('/updateUser', protectRoute, updateUser);
router.patch('/changePassword', protectRoute, changePassword);
router.post('/forgotPassword', forgotPassword);
router.put('/resetPassword/:resetToken', resetPassword);

module.exports = router;
