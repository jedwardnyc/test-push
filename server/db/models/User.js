const Sequelize = require('sequelize');
const conn = require('../conn');

const User = conn.define('user', {
  
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = User;

