const expect = require('chai').expect;
const Category = require('../../server/db/models/Category');
const Product = require('../../server/db/models/Product');
const LineItem = require('../../server/db/models/LineItem');
const Order = require('../../server/db/models/Order');
const User = require('../../server/db/models/User');
const db = require('../../server/db');

describe('models', () => {
  beforeEach(() => {
    return db.sync()
            .then(() => db.seed());
  });
  it('Product model exists', () => {
    expect(Product).to.be.ok;
  });
  it('Category model exists', () => {
    expect(Category).to.be.ok;
  });
  it('LineItem model exists', () => {
    expect(LineItem).to.be.ok;
  });
  it('Order model exists', () => {
    expect(Order).to.be.ok;
  });
  it('User model exists', () => {
    expect(User).to.be.ok;
  });
  describe('seeded data', () => {
    let category;
    beforeEach(() => {
      return Category.findAll()
      .then(_category => {
        category = _category;
      });
    });
    it('there are 5 categories', () => {
      expect(category.length).to.equal(5);
    });
    let product;
    beforeEach(() => {
      return Product.findAll()
      .then(_product => {
        product = _product;
      });
    });
    xit('there are 15 categories', () => {
      expect(product.length).to.equal(15);
    });
    describe('Aspirin product', () => {
      let product;
      beforeEach(() => {
        return Product.findOne({
          where: { name: 'Aspirin' },
          include: [ Category ]
        })
        .then(_product => {
          product = _product;
        });
      });
      it('exists', () => {
        expect(product).to.be.ok;
      });
      xit('has category set to 2 (Drugs)', () => {
        // this may be a different id every time
        expect(product.category_id).to.equal(2);
      });
    });
  });
});
