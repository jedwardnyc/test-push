const conn = require('../conn');
const Sequelize = conn.Sequelize;

const Order = conn.define('orders', {
  status: {
    type: Sequelize.ENUM,
    values: ['pending', 'ordered'],
    defaultValue: 'pending'
  },
  dateCreated: Sequelize.DATE,
  dateOrdered: Sequelize.DATE
});

module.exports = Order;
