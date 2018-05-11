import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ShoppingList from './ShoppingList';

const Cart = ({ userCartItems, subTotal, totalLineItems }) => {
  return (
    <div className="container-fluid m-4">
      <div className="row">
        <div className="col-sm-9">
          <div className="h1 border-bottom border-gray pb-2 mb-0">Shopping Cart</div>
          <ShoppingList />
        </div>
        <div className="col-sm-3 text-center">
          <div className="card card-side bg-light" style={{maxWidth: '18rem'}}>
            <div className="card-body">
              <h5 className="card-title">Total item{ totalLineItems > 1 ? 's' : '' }: { totalLineItems }</h5>
              <h5 className="card-title">Subtotal: ${ subTotal.toLocaleString('USD') }</h5>
              <p className="card-text"><Link to="/purchase" className="btn btn-primary"  disabled={ !userCartItems.length }>Place your Order</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart, lineItems, products }) => {
  // not checking orders b/c cart always status = 'CART'
  const userCartItems = lineItems.filter(item => {
    return item.order_id == cart.id && item;
  });

  const productMap = products.reduce((memo, product) => {
    memo[product.id] = product;
    return memo;
  }, {});

  const subTotal = userCartItems.reduce((sum, item) => {
    sum += (productMap[item.product_id].price * item.quantity);
    return sum;
  }, 0);

  const totalLineItems = userCartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return {
    userCartItems,
    productMap,
    subTotal,
    totalLineItems
  };
};

export default connect(mapStateToProps)(Cart);
