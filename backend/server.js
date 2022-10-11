/**
 *
 * Module imports
 *
 */

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

// Initialize dotenv
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Backend');
});

const PORT = process.env.PORT || 3001;

// Error middleware
app.use(errorHandler);

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
