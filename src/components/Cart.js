import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateLineItem, deleteLineItem } from '../store/lineitems';
import { updateOrder } from '../store/orders';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.onSaveQuantity = this.onSaveQuantity.bind(this);
    this.onPlaceAnOrder = this.onPlaceAnOrder.bind(this);
  }

  onSaveQuantity(ev) {
    const lineItem = { id: ev.target.name * 1, quantity: ev.target.value * 1 };
    this.props.updateLineItem(lineItem);
  }

  onDelete(itemId) {
    this.props.deleteLineItem(itemId);
  }

  onPlaceAnOrder(ev) {
    ev.preventDefault();
    console.log('onPlaceAnOrder');
    // const order = {
    //   id: this.state.orderId,
    //   status: 'ordered',
    //   dateOrdered: Date.now()
    // };
    // this.props.updateOrder(order);
  }

  render() {
    const { quantityOptions, userCartItems, productMap, subTotal, totalLineItems } = this.props;
    const { onSaveQuantity } = this;

    return (
      <div className="container mt-5 ml-5 row">
        <div className="col-sm-8">
          <h3 className="border-bottom border-gray pb-2 mb-0 row">Shopping Cart
            <div className="row">
              <h6 className="pl-5 mb-0">Price</h6>
              <h6 className="pl-5 mb-0">Quantity</h6>
            </div>
          </h3>
          {
            userCartItems && userCartItems.map(item => {
                const product = productMap[item.product_id];
                return (
                <div className="my-3 p-3 bg-light rounded box-shadow" key={ product.id }>
                  <div className="media pt-1">
                    <Link to={`/products/${product.id}`}><img src={ product.imgUrl } className="mr-2 rounded" width="100" height="100" /></Link>
                    <div className="row">
                      <Link to={`/products/${product.id}`} className="h5 ml-4 p-1">{ product.name }</Link>
                      <div className="row">
                        <h6 className="pl-5 mb-0">${ product.price }</h6>
                        <div className="pl-2">
                        <select name={ item.id } className="form-control p-2 mr-2" value={ item.quantity } onChange={ onSaveQuantity }>
                        {
                          quantityOptions.map(number => {
                            return (
                              <option value={number} key={number} >{number}</option>
                            );
                          })
                        }
                      </select>
                        </div>
                        <button className="btn btn-danger ml-2" onClick={() => this.onDelete(item.id)}>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })
            }
        </div>
        <div className="col-sm-3 ml-2 text-center">
          <div className="bg-light rounded box-shadow">
            <div className="h5 pt-4">Total item{ totalLineItems > 1 ? 's' : '' }: { totalLineItems }</div>
            <div className="h5 p-2">Subtotal: ${ subTotal.toLocaleString('USD') }</div>
            <button className="btn btn-block btn-primary p-2" onClick={this.onPlaceAnOrder}>Place your Order</button>
          </div>
        </div>
      </div>
    );
  }

  renderDelete(product, lineItems) {
    const lineItem = lineItems.find(lineItem => lineItem.product_id === product.id);
    return (
      <button className="btn btn-danger ml-2" onClick={() => this.onDelete(lineItem.id)}>Delete</button>
    );
  }
}

const mapStateToProps = ({ cart, lineItems, products }) => {
  const quantityOptions = [];
  for (let i = 1; i <= 20; i++) {
    quantityOptions.push(i);
  }

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
    quantityOptions,
    userCartItems,
    productMap,
    subTotal,
    totalLineItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLineItem: (lineItem) => dispatch(updateLineItem(lineItem)),
    deleteLineItem: id => dispatch(deleteLineItem(id)),
    updateOrder: (order) => dispatch(updateOrder(order))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
