const Sequelize = require('sequelize');
const conn = require('../conn');

const CreditCard = conn.define('credit_card', {
  number: {
    type: Sequelize.BIGINT
  },
  firstname: {
    type: Sequelize.STRING
  },
  lastname: {
    type: Sequelize.STRING
  },
  exp: {
    type: Sequelize.STRING
  }
})

module.exports = CreditCard;