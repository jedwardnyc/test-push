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
        // if star rating for user/product on db
        if (_starRating) {
          // if quantity different, add new
          if (_starRating.description != starRating.description) {
            Object.assign(_starRating, { rating: starRating.rating, description: starRating.description });
            return _starRating.save();
          }
          return _starRating;
        }
        // if star rating not on db, create
        attr.rating = starRating.rating;
        attr.description = starRating.description;
        return this.create(attr);
      })
      .then(() => this.findAll());
  }
  return this.findAll();
};

module.exports = StarRating;
