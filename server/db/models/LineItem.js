const conn = require('../conn');
const Sequelize = conn.Sequelize;

const LineItem = conn.define('line_items', {
  quantity: Sequelize.INTEGER,
});

// returns all line items with new item
LineItem.addToLineItems = function(lineItem) {
  if (lineItem.order_id && lineItem.product_id) {
    let attr = {
        order_id: lineItem.order_id,
        product_id: lineItem.product_id
    };
    return this.findOne({
      where: [attr]
    })
    .then(_lineItem => {
      // if line item for order/product on db
      if (_lineItem) {
        // if quantity different, add new
        if (_lineItem.quantity != lineItem.quantity) {
          Object.assign(_lineItem, { quantity: lineItem.quantity });
          return _lineItem.save();
        }
        return _lineItem;
      }
      // if line item not on db, create
      attr.quantity = lineItem.quantity;
      return this.create(attr);
    })
    .then(() => this.findAll());
  }
  return this.findAll();
};

module.exports = LineItem;
