const Sequelize = require('sequelize');
const conn = require('../conn');

const User = conn.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  resetPasswordToken: Sequelize.STRING,
  resetPasswordExpire: Sequelize.DATE,
  googleId: Sequelize.STRING,
  githubId: Sequelize.STRING
}, { 
  getterMethods: {
    fullname(value) {
      return `${this.firstname} ${this.lastname}`
    }
  }
});

module.exports = User;
