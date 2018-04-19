const conn = require('./conn');
const Sequelize = conn.Sequelize;

const Order = conn.define('orders', {
});

module.exports = Order;
