const conn = require('./conn');

const User = require('./models/User');
const Category = require('./models/Category');
const LineItem = require('./models/LineItem');
const Order = require('./models/Order');
const Product = require('./models/Product');
const CreditCard = require('./models/CreditCard');
const Address = require('./models/Address');
const StarRating = require('./models/StarRating');
const SearchResult = require('./models/SearchResult');

const { products, categories, users, lineItems, addresses, credit_cards } = require('./seed.js');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
Order.belongsTo(CreditCard);
Order.belongsTo(Address);
LineItem.belongsTo(Product);
Product.belongsTo(Category);
Address.belongsTo(User);
CreditCard.belongsTo(User);
StarRating.belongsTo(User);
StarRating.belongsTo(Product);
User.hasMany(StarRating);
Product.hasMany(StarRating);


const sync = () => conn.sync({ force: true });

const seed = () => {
  Promise.all([
    Object.keys(products).forEach(productKey => {
      Category.create(categories[productKey])
        .then(category => {
          products[productKey].map(product => {
            Product.create(product)
              .then(_product => {
                _product.setCategory(category);
              })
              .catch(err => console.log(err));
          })
        })
        .catch(err => console.log(err));
    }),
    Object.keys(users).forEach(key => {
      User.create(users[key])
        .then(user => {
          Address.create(addresses[key])
            .then(address => {
              address.setUser(user)
            })
          CreditCard.create(credit_cards[key])
            .then(creditcard => {
              creditcard.setUser(user)
            })
        })
    })
  ])
};


module.exports = {
  conn,
  sync,
  seed,
  models: {
    Category,
    LineItem,
    Order,
    Product,
    User,
    CreditCard,
    Address,
    StarRating,
    SearchResult
  }
};
