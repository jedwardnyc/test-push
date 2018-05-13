const conn = require('../conn');
const Sequelize = conn.Sequelize;
const LineItem = require('./LineItem');
const User = require('./User');

const Order = conn.define('orders', {
  status: {
    type: Sequelize.ENUM,
    values: ['CART', 'ORDERED'],
    defaultValue: 'CART'
  },
  dateCreated: {
    type: Sequelize.DATE,
    defaultValue: Date.now()
  },
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
    return this.findById(cart.id);
  })
  .then(cart => cart);
};

Order.checkOutUser = function(userId, cardId, addressId) {
  return this.findOne({
    where: [{
      user_id: userId,
      status: 'CART'
    }]
  })
  .then(cart => {
    cart = Object.assign(cart, {
      status: 'ORDERED',
      dateOrdered: Date.now(),
      credit_card_id: cardId,
      address_id: addressId
    });
    return cart.save();
  })
  .then(() => {
    return User.findById(userId);
  })
  .then(user => {
    return this.create({
      user_id: user.id,
      status: 'CART'
    });
  })
  .then(cart => cart);
};

module.exports = Order;
