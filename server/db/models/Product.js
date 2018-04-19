const conn = require('../conn');
const Sequelize = conn.Sequelize;

const Product = conn.define('products', {
  name: {
    type: Sequelize.STRING,
  },
  price: Sequelize.DECIMAL
});

module.exports = Product;
