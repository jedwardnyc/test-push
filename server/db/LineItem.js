const conn = require('./conn');
const Sequelize = conn.Sequelize;

const LineItem = conn.define('line_items', {
  quantity: Sequelize.INTEGER,
});

module.exports = LineItem;
