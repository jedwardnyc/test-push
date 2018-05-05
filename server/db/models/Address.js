const Sequelize = require('sequelize');
const conn = require('../conn');

const Address = conn.define('address', {
  name: Sequelize.STRING,
  line1: Sequelize.STRING,
  line2: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  zip: Sequelize.STRING
})

module.exports = Address;