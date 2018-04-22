const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/thelightweb', {
  define: {
    timestamps: false,
    underscored: true
  },
  logging: false
});

module.exports = conn;

