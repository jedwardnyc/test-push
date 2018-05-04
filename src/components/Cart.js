import React from 'react';
import { connect } from 'react-redux';
import { updateLineItem, deleteLineItem } from '../store/lineitems';
import { updateOrder } from '../store/orders';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    // this.state = this.cartState(this.props);
    this.onSaveQuantity = this.onSaveQuantity.bind(this);
    this.onPlaceAnOrder = this.onPlaceAnOrder.bind(this);
  }

  componentDidMount() {
    // console.log('CART', this.props.cart);
  }

  // cartState(props) {
  //   return {
  //     quantity: props.lineItem ? props.lineItem.quantity : '',
  //     product_id: props.lineItem ? props.lineItem.product_id : '',
  //     order_id: props.lineItem ? props.lineItem.order_id : '',
  //     orderId: props.user ? props.user.order_id : ''
  //   };
  // }

  componentWillReceiveProps(nextProps) {
    // this.setState(this.cartState(nextProps));
  }

  onSaveQuantity(ev) {
    console.log('onSaveQuantity');
    // ev.preventDefault();
    // const lineItem = { id: ev.target.name, quantity: ev.target.value };
    // this.props.updateLineItem(lineItem);
  }

  onDelete(id) {
    console.log('onDelete')
    // this.props.deleteLineItem({ id });
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
    // const { products, lineItems, filteredProducts, subTotal, totalLineItems, orders } = this.props;
    const { quantityOptions, userCartItems, productMap } = this.props;
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
                // console.log('cart item', item, item.id, item.product_id);
                const product = productMap[item.product_id];
                return (
                <div className="my-3 p-3 bg-light rounded box-shadow" key={ product.id }>
                  <div className="media pt-1">
                    <img src={ product.imgUrl } className="mr-2 rounded" width="100" height="100" />
                    <div className="row">
                      <h5 className="ml-4 p-1">{ product.name }</h5>

                      <div className="row">
                        <h6 className="pl-5 mb-0">${ product.price }</h6>
                        <div className="pl-2">
                        <select name="lineItem.id" className="form-control p-2 mr-2" onChange={ onSaveQuantity }>
                        <option>quantity</option>
                        {
                          quantityOptions.map(option => {
                            return (
                              option
                            );
                          })
                        }
                      </select>
                        </div>
                        <button className="btn btn-danger ml-2" onClick={() => this.onDelete('lineItem.id')}>Delete</button>
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
            <h5 className="p-2 mr-2 mt-3">Subtotal (totalLineItems item(s)):</h5>
            <h5 className="p-2 mr-2">$ subTotal</h5>
            <button className="btn btn-block btn-primary p-2" onClick={this.onPlaceAnOrder}>Place your Order</button>
          </div>
        </div>
      </div>
    );
  }

  // {
  //   filteredProducts && filteredProducts.map(product => {
  //     return (
  //       <div className="my-3 p-3 bg-light rounded box-shadow" key="">
  //         <div className="media pt-1">
  //           <img src="product.imgUrl" className="mr-2 rounded" width="100" height="100" />
  //           <div className="row">
  //             <h5 className="ml-4 p-1">{product.name}</h5>

  //             <div className="row">
  //               <h6 className="pl-5 mb-0">${product.price}</h6>
  //               <div className="pl-2">
  //               <select name="lineItem.id" className="form-control p-2 mr-2" onChange={ onSaveQuantity }>
  //               <option>quantity</option>
  //               {
  //                 quantityOptions.map(option => {
  //                   return (
  //                     option
  //                   );
  //                 })
  //               }
  //             </select>
  //               </div>
  //               this.renderDelete(product, lineItems)
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   })
  // }

  // renderQuantityLineItem(product, lineItems, options) {
  //   const quantity = lineItems.find(lineItem => lineItem.product_id === product.id).quantity;
  //   const lineItem = lineItems.find(lineItem => lineItem.product_id === product.id);
  //   return (
  //     <select name={lineItem.id} className="form-control p-2 mr-2" onChange={this.onSaveQuantity}>
  //       <option>{quantity}</option>
  //       {
  //         quantityOptions.map(option => {
  //           return (
  //             option
  //           );
  //         })
  //       }
  //     </select>
  //   );
  // }

  renderDelete(product, lineItems) {
    const lineItem = lineItems.find(lineItem => lineItem.product_id === product.id);
    return (
      <button className="btn btn-danger ml-2" onClick={() => this.onDelete(lineItem.id)}>Delete</button>
    );
  }

}

const mapStateToProps = ({ cart, lineItems, products }) => { // products, lineItems, orders
  // console.log('Cart prods', products)

  const quantityOptions = [];
  for (let i = 1; i <= 20; i++) {
    quantityOptions.push(<option value={i} key={i}>{i}</option>);
  }

  const userCartItems = lineItems.filter(item => {
    // not checking orders b/c cart always status = 'CART'
    return item.order_id == cart.id && item;
  });
  // console.log('userCartItems', userCartItems)

  const productMap = products.reduce((memo, product) => {
    // const id = product.id;
    memo[product.id] = product;
    return memo;
    // return Object.assign({}, { id: product });
  }, {});
  // console.log('prod map', productMap);

  // const filteredProducts = lineItemId.map(lineItem => {
  //   return lineItem.product_id;
  // }).map(id => {
  //   return products.find(product => product.id === id);
  // });

  // const subTotal = filteredProducts.reduce((total, amount) => {
  //   const count = lineItems.find(lineItem => lineItem.product_id === amount.id).quantity * 1;
  //   total += count * (amount.price * 1);
  //   return Math.round(total * 100) / 100;
  // }, 0);

  // const totalLineItems = filteredProducts.reduce((total, amount) => {
  //   const count = lineItems.find(lineItem => lineItem.product_id === amount.id).quantity * 1;
  //   total += count * 1;
  //   return total;
  // }, 0);

  return {
    quantityOptions,
    userCartItems,
    productMap
    // filteredProducts,
    // subTotal,
    // totalLineItems,
    // orders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLineItem: (lineitem) => dispatch(updateLineItem(lineitem)),
    deleteLineItem: (lineitem) => dispatch(deleteLineItem(lineitem)),
    updateOrder: (order) => dispatch(updateOrder(order))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
