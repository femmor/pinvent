const express = require('express');
const {
  registerUser,
  loginUser,
  logOut,
  getUserData,
} = require('../controllers/userControllers');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logOut);
router.get('/user', getUserData);

module.exports = router;
