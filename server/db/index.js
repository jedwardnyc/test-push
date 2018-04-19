const conn = require('./conn');
const Category = require('./Category');
const LineItem = require('./LineItem');
const Order = require('./Order');
const Product = require('./Product');
const { products, categories } = require('./seed.js');

// Order.belongsTo(User);
LineItem.belongsTo(Order);
Product.belongsTo(LineItem);
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
          });
        })
      );
    });
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
    Product
  }
};
