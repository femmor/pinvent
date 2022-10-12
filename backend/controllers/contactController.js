const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');

const contactUs = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(400);
    throw new Error('User not found, please sign up!');
  }

  // Validate subject and message
  if (!message || !subject) {
    res.status(400);
    throw new Error('Please provide a message and subject!');
  }

  // send to
  const send_to = process.env.EMAIL_USER;

  // sent from
  const sent_from = process.env.EMAIL_USER || 'noreply@pinvent.com';

  const reply_to = user.email;

  try {
    await sendEmail(subject, message, send_to, sent_from, reply_to);
    res.status(200).json({
      success: true,
      message: 'Email was sent successfully!',
    });
  } catch (error) {
    res.status(500);
    throw new Error('Email not sent, please try again!');
  }
});

module.exports = {
  contactUs,
};
