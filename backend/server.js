/**
 *
 * Module imports
 *
 */

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/connectDB');

// Initialize dotenv
dotenv.config();

// Initialize app
const app = express();

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Backend');
});

const PORT = process.env.PORT || 3001;

// initialize server
const startServer = async () => {
  await connectDB();

  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
