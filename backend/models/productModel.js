const mongoose = require('mongoose');

const productModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    sku: {
      type: String,
      required: true,
      default: 'SKU',
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    quantity: {
      type: String,
      required: [true, 'Please add a quantity'],
    },
    price: {
      type: String,
      required: [true, 'Please add a price'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    description: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

productModel.virtual('id').get(function () {
  return this._id.toString();
});

productModel.set('toJSON', {
  virtuals: true,
});

const Product = mongoose.model('Product', productModel);

module.exports = Product;
