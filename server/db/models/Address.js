const Sequelize = require('sequelize');
const conn = require('../conn');

const Address = conn.define('address', {
  line1: {
    type: Sequelize.STRING
  },
  line2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  zip: {
    type: Sequelize.STRING
  },
})

module.exports = Address;