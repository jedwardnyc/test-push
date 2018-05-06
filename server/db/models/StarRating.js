const conn = require('../conn');
const Sequelize = conn.Sequelize;

const StarRating = conn.define('star_rating', {
  rating: Sequelize.INTEGER,
  description: Sequelize.TEXT
});

// returns all star ratings with new item
StarRating.addToStarRatings = function (starRating) {
  if (starRating.user_id && starRating.product_id) {
    const attr = {
      user_id: starRating.user_id,
      product_id: starRating.product_id
    };
    return this.findOne({
      where: [attr]
    })
      .then(_starRating => {
        if (_starRating) {
          // if (_starRating.rating != starRating.rating) {
          //   Object.assign(_starRating, { rating: starRating.rating, description: starRating.description });
          //   return _starRating.save();
          // }
          return null;//'_starRating';
        }
        
        attr.rating = starRating.rating;
        attr.description = starRating.description;
        return this.create(attr);
      })
      .then(() => this.findAll());
  }
  return this.findAll();
};

module.exports = StarRating;
