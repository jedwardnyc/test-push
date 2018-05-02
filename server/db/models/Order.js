const conn = require('../conn');
const Sequelize = conn.Sequelize;
const LineItem = require('./LineItem');

const Order = conn.define('orders', {
  status: {
    type: Sequelize.ENUM,
    values: ['CART', 'ORDERED'],
    defaultValue: 'CART'
  },
  dateCreated: Sequelize.DATE,
  dateOrdered: Sequelize.DATE
});

Order.getCartForUser = function(user) {
  const attr = {
    user_id: user.id,
    status: 'CART'
  };
  return this.findOne({
    where: [ attr ]
  })
  .then(cart => {
    if (cart) {
      return cart;
    }
    return this.create(attr);
  })
  .then(cart => {
    return this.findById(cart.id, {
      include: [ LineItem ]
    });
  });
};

module.exports = Order;
