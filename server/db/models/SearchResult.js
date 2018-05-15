const conn = require('../conn');
const Sequelize = conn.Sequelize;

const SearchResult = conn.define('searchResults', {
  name: Sequelize.STRING,
  price: Sequelize.DECIMAL,
  imgUrl: Sequelize.TEXT,
  description: Sequelize.TEXT,
  availability: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

module.exports = SearchResult;
