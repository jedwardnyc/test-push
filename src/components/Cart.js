import React from 'react';
import { connect } from 'react-redux';
import { updateLineItem, deleteLineItem } from '../store/lineitems';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.lineItemState(this.props);
    this.onSaveQuantity = this.onSaveQuantity.bind(this);
  }

  lineItemState(props) {
    return {
      quantity: props.lineItem ? props.lineItem.quantity : '',
      product_id: props.lineItem ? props.lineItem.product_id : '',
      order_id: props.lineItem ? props.lineItem.order_id : ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.lineItemState(nextProps));
  }

  onSaveQuantity(ev) {
    ev.preventDefault();
    const lineItem = { id: ev.target.name, quantity: ev.target.value };
    this.props.updateLineItem(lineItem);
  }

  onDelete(id) {
    this.props.deleteLineItem({ id });
  }

  filterProducts(products, lineItems) {
    if (!lineItems) {
      return null;
    }
    const listLineItemId = lineItems.map(lineItem => {
      return lineItem.product_id;
    });

    if (!products) {
      return null;
    }
    return listLineItemId.map(id => {
      return products.find(product => product.id === id);
    });
  }

  renderQuantityLineItem(product, lineItems, options) {
    if (!lineItems) {
      return null;
    }
    if (!product) {
      return null;
    }
    const quantity = lineItems.find(lineItem => lineItem.product_id === product.id).quantity;
    const lineitem = lineItems.find(lineItem => lineItem.product_id === product.id);
    return (
      <select name={lineitem.id} className="form-control p-2 mr-2" onChange={this.onSaveQuantity}>
        <option>{quantity}</option>
        {
          options.map(option => {
            return (
              option
            );
          })
        }
      </select>
    );
  }

  renderDelete(product, lineItems) {
    if (!product) {
      return null;
    }
    if (!lineItems) {
      return null;
    }
    const lineitem = lineItems.find(lineItem => lineItem.product_id === product.id);
    return (
      <button className="btn btn-danger ml-2" onClick={() => this.onDelete(lineitem.id)}>Delete</button>
    );
  }

  render() {
    const { products, lineItems } = this.props;

    //option
    const options = [];
    for (let i = 1; i <= 20; i++) {
      options.push(<option value={i} key={i}>{i}</option>);
    }

    const filteredProducts = this.filterProducts(products, lineItems);

    const subTotal = filteredProducts.reduce((total, amount) => {
      const count = lineItems.find(lineItem => lineItem.product_id === amount.id).quantity * 1;
      total += count * (amount.price * 1);
      return Math.round(total * 100) / 100;
    }, 0);

    const totalLineItems = filteredProducts.reduce((total, amount) => {
      const count = lineItems.find(lineItem => lineItem.product_id === amount.id).quantity * 1;
      total += count * 1;
      return total;
    }, 0);

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
            filteredProducts && filteredProducts.map(product => {
              return (
                <div className="my-3 p-3 bg-light rounded box-shadow" key={ product.id }>
                  <div className="media pt-1">
                    <img src={product.imgUrl} className="mr-2 rounded" width="100" height="100" />
                    <div className="row">
                      <h5 className="ml-4 p-1">{ product.name }</h5>

                      <div className="row">
                        <h6 className="pl-5 mb-0">${ product.price }</h6>
                        <div className="pl-2">
                          {this.renderQuantityLineItem(product, lineItems, options)}
                        </div>
                        {this.renderDelete(product, lineItems)}
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
            <h5 className="p-2 mr-2 mt-3">Subtotal ({totalLineItems} item(s)):</h5>
            <h5 className="p-2 mr-2">$ {subTotal}</h5>
            <button className="btn btn-block btn-primary p-2">Place your Order</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products, lineItems }) => {
  return {
    products,
    lineItems
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLineItem: (lineitem) => dispatch(updateLineItem(lineitem)),
    deleteLineItem: (lineitem) => dispatch(deleteLineItem(lineitem))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
