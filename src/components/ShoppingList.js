import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateLineItem, deleteLineItem } from '../store/lineitems';

class ShoppingList extends Component {
  constructor() {
    super();
    this.onSaveQuantity = this.onSaveQuantity.bind(this);
  }

  onSaveQuantity(ev) {
    const lineItem = { id: ev.target.name * 1, quantity: ev.target.value * 1 };
    this.props.updateLineItem(lineItem);
  }

  render() {
    const { userCartItems, productMap, quantityOptions } = this.props;
    const { onSaveQuantity } = this;
    return (
      <div className="shopping-list">
      {
        userCartItems && userCartItems.map(item => {
          const product = productMap[item.product_id];
          return (
            <div  key={ product.id } className="container-fluid">
              <div className="row mb-3 shopping-item-row">
                <div className="col-sm-3 pb-3">
                  <Link to={`/products/${product.id}`}><img src={ product.imgUrl } className="img-fluid" /></Link>
                </div>
                <div className="col-sm-5 mt-3 pr-0">
                  <p className="h4"><Link to={`/products/${product.id}`} className="h4">{ product.name }</Link></p>
                  <p className="mt-4"><button className="btn btn-sm btn-danger ml-2" onClick={() => this.onDelete(item.id)}>Delete</button></p>
                </div>
                <div className="col-sm-4">
                  <table className="table table-hover">
                  <thead>
                    <tr>
                      <td scope="col text-muted small" style={{ borderTop: 0 }}><em>Price</em></td>
                      <td scope="col text-muted small" style={{ borderTop: 0 }}><em>Quantity</em></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>${ product.price.toLocaleString('USD') }</td>
                      <td><select name={ item.id } className="form-control p-2 mr-2" value={ item.quantity } onChange={ onSaveQuantity }>
                      {
                        quantityOptions.map(number => {
                          return (
                            <option value={number} key={number} >{number}</option>
                          );
                        })
                      }
                      </select></td>
                    </tr>
                  </tbody>
                  </table>
                </div>
              </div>
            </div>
            );
          })
        }
    </div>
    );
  }
}

const mapStateToProps = ({ cart, lineItems, products }) => {
  const quantityOptions = [];
  for (let i = 1; i <= 20; i++) {
    quantityOptions.push(i);
  }
  
  const userCartItems = lineItems.filter(item => item.order_id == cart.id && item );

  const productMap = products.reduce((memo, product) => {
    memo[product.id] = product;
    return memo;
  }, {});

  return {
    quantityOptions,
    userCartItems,
    productMap
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateLineItem: (lineItem) => dispatch(updateLineItem(lineItem)),
    deleteLineItem: id => dispatch(deleteLineItem(id))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
