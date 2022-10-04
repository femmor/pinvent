// Register user controller
const registerUser = (req, res) => {
  if (!req.body.email) {
    res.status(404);
    throw new Error('Please enter an email address');
  }

  res.send('Register user controller');
};

module.exports = {
  registerUser,
};
