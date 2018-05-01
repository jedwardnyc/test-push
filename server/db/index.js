const conn = require('./conn');

const User = require('./models/User');
const Category = require('./models/Category');
const LineItem = require('./models/LineItem');
const Order = require('./models/Order');
const Product = require('./models/Product');
const { products, categories, users } = require('./seed.js');

Order.belongsTo(User);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
LineItem.belongsTo(Product);
Product.belongsTo(Category);

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
  });
  Object.keys(users).forEach(productKey => {
    User.create(users[productKey]);
  });
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
