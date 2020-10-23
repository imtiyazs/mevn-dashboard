const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

/**
 * @typedef Category
 */
const Category = mongoose.model('Categories', categorySchema);

module.exports = Category;
