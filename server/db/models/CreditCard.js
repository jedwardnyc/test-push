const Sequelize = require('sequelize');
const conn = require('../conn');

const CreditCard = conn.define('credit_card', {
  number: {
    type: Sequelize.BIGINT
  },
  first_name: {
    type: Sequelize.STRING
  },
  last_name: {
    type: Sequelize.STRING
  },
  exp: {
    type: Sequelize.STRING
  }
})

module.exports = CreditCard;