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
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

// Initialize dotenv
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.user('/api/users', userRoutes);

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
