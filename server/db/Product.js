const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Product = conn.define('products', {
  name: Sequelize.STRING,
  price: Sequelize.DECIMAL
});

module.exports = Product;
