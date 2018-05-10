const conn = require('../conn');
const Sequelize = conn.Sequelize;

const StarRating = conn.define('star_rating', {
  rating: Sequelize.INTEGER,
  description: Sequelize.TEXT
});

module.exports = StarRating;
