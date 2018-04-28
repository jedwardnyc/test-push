const conn = require('../conn');
const Sequelize = conn.Sequelize;

const Product = conn.define('products', {
  name: {
    type: Sequelize.STRING,
  },
  price: Sequelize.DECIMAL,
  imgUrl: Sequelize.STRING,
  description: Sequelize.TEXT,
  availability: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Product;
