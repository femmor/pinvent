const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { fileSizeFormatter } = require('../utils/fileUpload');
const cloudinary = require('cloudinary').v2;

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, quantity, price, description } = req.body;

  // Validate request
  if (!name || !sku || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error('Please fill in all required fields');
  }

  // TODO: Manage image upload
  let fileData = {};
  if (req.file) {
    // Save image to cloudinary
    let uploadedFile;

    try {
      uploadedFile = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Pinvent App',
        resource_type: 'image',
      });
    } catch (error) {
      res.status(500);
      res.send(error);
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: uploadedFile.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    };
  }

  // Create Product
  const product = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    quantity,
    price,
    description,
    image: fileData,
  });

  res.status(201).json(product);
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({
    user: req.user.id,
  }).sort('-createdAt');

  if (products.length > 0) {
    res.status(200).json(products);
  } else {
    res.status(400);
    throw new Error('No product found');
  }
});

module.exports = {
  createProduct,
  getProducts,
};
