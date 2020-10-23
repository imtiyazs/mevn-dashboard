const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  categoryId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
