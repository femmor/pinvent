const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { fileSizeFormatter } = require('../utils/fileUpload');
const cloudinary = require('cloudinary').v2;

/**
 *
 * Create a new product
 *
 */
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

/**
 *
 * Get all products
 *
 */
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

/**
 *
 * Get a single product
 *
 */
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // If no product is found
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if user is authorized to get single product
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('You are not authorized to view this product');
  }

  res.status(200).json(product);
});

/**
 *
 * Delete a product
 *
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  // If no product is found
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Check if user is authorized to get single product
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('You are not authorized to delete this product');
  }

  await product.remove();
  res.status(200).json({
    message: 'Product successfully deleted',
    product,
  });
});

/**
 *
 * Update a product
 *
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Match product to user
  if (product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('You are not authorized to update this product');
  }

  // Manage image file upload
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

  // Update Product
  const updatedProduct = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name,
      category,
      quantity,
      price,
      description,
      image: Object.keys(fileData).length === 0 ? product?.image : fileData,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
