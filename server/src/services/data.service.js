const { Category, Order, Product, User } = require('../models');

/**
 * Returns all summarized statistics
 * @returns {Promise<QueryResult>}
 */
const getAllStatsData = async () => {
  let data = {
    totalCategories: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalPendingOrders: 0,
    totalCompletedOrders: 0,
    totalUsers: 0,
    totalPendingPayments: 0,
    totalCompletedPayments: 0,
    categories: [],
    products: [],
    orders: [],
    users: [],
  };

  // Get categories
  const categories = await Category.find({});
  data.categories = categories;
  data.totalCategories = categories.length;

  // Get orders
  const orders = await Order.find({});
  data.orders = orders;
  data.totalOrders = orders.length;
  data.totalPendingOrders = orders.filter((order) => order.orderStatus === 'pending').length;
  data.totalCompletedOrders = orders.filter((order) => order.orderStatus === 'completed').length;
  data.totalPendingPayments = orders.filter((order) => order.paymentStatus === 'pending').length;
  data.totalCompletedPayments = orders.filter((order) => order.paymentStatus === 'completed').length;

  // Get products
  const products = await Product.find({});
  data.products = products;
  data.totalProducts = products.length;

  // Get Users
  const users = await User.find({});
  data.totalUsers = users.length;
  data.users = users;

  return data;
};

module.exports = {
  getAllStatsData,
};
