const conn = require('./conn');

const User = require('./models/User');
const Category = require('./models/Category');
const LineItem = require('./models/LineItem');
const Order = require('./models/Order');
const Product = require('./models/Product');
const { products, categories, users, lineItems, orders } = require('./seed.js');

Order.belongsTo(User);
LineItem.belongsTo(Order);
LineItem.belongsTo(Product);
Product.belongsTo(Category);
// User.hasMany(Order);
// Order.hasMany(LineItem);
// Category.hasMany(Product);

const sync = () => conn.sync({ force: true });

const seed = () => {
  Object.keys(products).forEach(productKey => {
    Category.create(categories[productKey])
      .then(category => {
        Promise.all(
          products[productKey].map(product => {
            Product.create(product)
              .then(_product => {
                _product.setCategory(category);
              })
              .catch(err => console.log(err));
          })
        );
      })
      .catch(err => console.log(err));
  })
  Object.keys(users).forEach(productKey => {
    User.create(users[productKey])
  })
  Object.keys(lineItems).forEach(key => {
    Order.create(orders[key])
      .then(() => Promise.all(
        lineItems[key].map(lineItem => {
          LineItem.create(lineItem)
            .catch(err => console.log(err));
        })
      ))
      .catch(err => console.log(err));
  })
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
    User
  }
};

