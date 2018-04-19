const conn = require('./conn');
const Sequelize = conn.Sequelize;

const LineItem = conn.define('lineitems', {
  name: Sequelize.STRING
});

module.exports = LineItem;
