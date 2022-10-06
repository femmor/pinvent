const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate token function
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

/**
 *
 * Get Users
 *
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (users) {
    res.status(200).send(users);
  } else {
    res.status(400);
    throw new Error('No users found!');
  }
});

/**
 *
 * Register user controller
 *
 */

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate form fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  // Validate password
  if (password.length < 6) {
    res.status(400);
    throw new Error('Password must be at least 6 characters long');
  }

  // Check if email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('Email already exists');
  }

  // Create new user
  const user = await User.create({ name, email, password });

  // Generate token for user
  const token = generateToken(user._id);

  // Send HTTP-only cookie to the client
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  });

  if (user) {
    const { id, name, email, photo, phone, bio } = user;

    res.status(201).json({
      id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

/**
 *
 * Login user controller
 *
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate request
  if (!email || !password) {
    res.status(400);
    throw new Error('Please enter email and password');
  }

  // Check if user exists in the DB
  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new Error('User not found, please sign up!');
  }

  // Check if password is correct
  const passwordIsCorrect = await bcrypt.compare(password, user.password);

  // Generate token for user
  const token = generateToken(user._id);

  // Send HTTP-only cookie to the client
  res.cookie('token', token, {
    path: '/',
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400), // 1 day
    sameSite: 'none',
    secure: true,
  });

  if (user && passwordIsCorrect) {
    const { id, name, email, photo, phone, bio } = user;

    res.status(200).json({
      id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid email or password');
  }

  // Login user
});

/**
 *
 * LogOut user
 *
 */

const logOut = asyncHandler((req, res) => {
  // You can delete cookie
  // Or expire cookie
  res.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'none',
    secure: true,
  });
  return res.status(200).json({
    message: 'Successfully logged out!',
  });
});

/**
 *
 * Get user information
 *
 */
const getUserData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  // If user was found
  if (user) {
    const { id, name, email, photo, phone, bio } = user;

    res.status(200).json({
      id,
      name,
      email,
      photo,
      phone,
      bio,
    });
  } else {
    res.status(400);
    throw new Error('User not found!');
  }
});

/**
 *
 * Get user logged in status
 *
 */

const getLogInStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  // Check if there is no token
  if (!token) {
    return res.json(false);
  }

  // Check if the token is valid
  const verified = jwt.verify(token, process.env.JWT_SECRET);

  if (verified) {
    return res.json(true);
  }

  return res.json(false);
});

/**
 *
 * Update user information
 *
 */

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const { name, email, photo, phone, bio } = user;

    user.email = email;
    user.name = req.body.name || name;
    user.photo = req.body.photo || photo;
    user.phone = req.body.phone || phone;
    user.bio = req.body.bio || bio;

    const updatedUser = await user.save();
    res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      photo: updatedUser.photo,
      phone: updatedUser.phone,
      bio: updatedUser.bio,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

/**
 *
 * Change password
 *
 */

const changePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, newPassword } = req.body;

  // Check if user exists
  if (!user) {
    res.status(400);
    throw new Error('User not found, please sign up!');
  }

  // Validate
  if (!oldPassword || !newPassword) {
    res.status(400);
    throw new Error('Please add old and new password');
  }

  // Check if oldPassword matches password in the DB
  const passwordCorrect = await bcrypt.compare(oldPassword, user.password);

  if (user && passwordCorrect) {
    user.password = newPassword;

    await user.save();
    res.status(200).json({
      message: 'Password changed successfully!',
    });
  } else {
    res.status(400);
    throw new Error('Old password is incorrect! Please try again!');
  }
});

module.exports = {
  registerUser,
  loginUser,
  logOut,
  getUsers,
  getUserData,
  getLogInStatus,
  updateUser,
  changePassword,
};
