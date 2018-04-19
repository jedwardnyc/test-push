const conn = require('../conn');
const Sequelize = conn.Sequelize;

const Category = conn.define('categories', {
  name: Sequelize.STRING
});

module.exports = Category;
