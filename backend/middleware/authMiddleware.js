const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { request } = require('express');

const protectRoute = asyncHandler(async (req, res, next) => {
  try {
    // Check if client request has a token
    const token = req.cookies.token;

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, please login!');
    }

    // Check if the token is valid
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      res.status(401);
      throw new Error('Not authorized, please login!');
    }

    // Get user id from token
    const user = await User.findById(verified.id).select('-password');

    // Check if user is not in DB
    if (!user) {
      res.status(401);
      throw new Error('User not found!');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized, please login!');
  }
});

module.exports = protectRoute;
