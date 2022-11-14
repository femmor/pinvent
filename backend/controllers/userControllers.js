const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Token = require('../models/tokenModel');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');

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
  const user = await User.findById(req.user.id);

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
  const user = await User.findById(req.user.id);

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
  const user = await User.findById(req.user.id);
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

/**
 *
 * Forgot password
 *
 */

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  // Check if user exists
  if (!user) {
    res.status(404);
    throw new Error('User does not exist.');
  }

  // Delete token if it exists in the DB
  let token = await Token.findOne({ userId: user.id });

  if (token) {
    await token.deleteOne();
  }

  // Create reset token
  let resetToken = crypto.randomBytes(32).toString('hex') + user.id;
  console.log(resetToken);

  // hash token before saving to DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Save token to DB
  const newToken = new Token({
    userId: user.id,
    token: hashedToken,
    createdAt: new Date(),
    expiresAt: Date.now() + 30 * (60 * 1000), // 30mins,
  });

  await newToken.save();

  // Construct reset url
  const resetUrl = `${process.env.CLIENT_URL}/resetPassword/${resetToken}`;

  /**
   *
   * Send email args
   *
   */

  // message
  const message = `
    <h2>Hello ${user.name}</h2>
    <p>Please use the link below to reset your password:</p>
    <p><a href=${resetUrl} clickTracking="off">${resetUrl}</a></p>

    <p>The reset link is valid for 30 minutes.</p>

    <h3>If you did not request this, please ignore this email.</h3>

    <p>Regards</p>
    <p>PInvent Team</p>

  `;

  // subject
  const subject = `Password reset for ${user.name}`;

  // send to
  const send_to = user.email;

  // sent from
  const sent_from = process.env.EMAIL_USER || 'noreply@pinvent.com';

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({
      success: true,
      message: 'Reset email sent!',
    });
  } catch (error) {
    res.status(500);
    throw new Error('Email not sent, please try again!');
  }
});

/**
 *
 * Reset password
 *
 */

/* TODO - Fix Bug */

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  // hash token then compare to token in the DB
  const hashedToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Find token in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });

  if (!userToken) {
    res.status(404);
    throw new Error('Invalid or expired token');
  }

  const user = await User.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();

  res.status(200).json({
    message: 'Password reset successful, please login!',
  });
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
  forgotPassword,
  resetPassword,
};
