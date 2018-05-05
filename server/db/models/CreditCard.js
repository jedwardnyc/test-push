const Sequelize = require('sequelize');
const conn = require('../conn');

const CreditCard = conn.define('credit_card', {
  number: Sequelize.BIGINT,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  exp: Sequelize.STRING
})

module.exports = CreditCard;