import React from 'react';
import { connect } from 'react-redux';
import { addLineItemToCart, createLineItem, keepLoggedIn } from '../../store';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quantity: 1 };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSave(ev) {
    const lineItem = { quantity: this.state.quantity, product_id: this.props.id, order_id: this.props.cart.id };
    this.props.addLineItemToCart(lineItem);
  }

  // not doing anything -bv
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ quantity: nextProps.lineitem ? nextProps.lineitem.quantity : 1});
  // }

  render() {
    const { product, quantityOptions } = this.props;
    const { onSave, onChange } = this;
    if (!product) {
      return null;
    }
    return (
      <div className="container border rounded mt-5 ml-5 bg-lightr row">
        <div className="col-sm">
          <img className="img-fluid mt-4 mb-4" src={product.imgUrl} />
        </div>
        <div className="col-sm">
          <h3 className="text-left pt-3 pb-3">{product.name}</h3>
          <h5 className="mt-3 mb-3">Price: ${product.price}</h5>
          <div className="card">
            <div className="card-body rounded">
              <div className="row">
                <div className="col sm-12 med-6">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <label className="input-group-text" htmlFor="inputQuantity">Quantity</label>
                    </div>
                    <select className="custom-select p-2 mr-2" id="inputQuantity" name="quantity" onChange={ onChange }>
                      {
                        quantityOptions.map(option => {
                          return (
                            option
                          );
                        })
                      }
                    </select>
                  </div>
                </div>
                <div className="col sm-12 med-6">
                  <button className="btn btn-primary float-right" onClick={ onSave }>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className='rounded mr-1 row'>
            <h5 className='mr-1'>Quantity: </h5>
            <select className='form-control col-sm-1 p-2 mr-2' name='quantity' onChange={ onChange }>
              {
                quantityOptions.map(option => {
                  return (
                    option
                  );
                })
              }
            </select>
            <button className='btn btn-primary p-2 mr-2' disabled={!product.availability} onClick={ onSave }>Add to Cart</button>
          </div>
          <div>
            <h4 className='mt-2 text-danger'>{!product.availability ? 'Currently Unavailable' : ''}</h4>
          </div>
          <br />
          <h5 className='border-top p-2 mr-1'>Description: {product.description}</h5>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products, cart }, { id }) => {
  const quantityOptions = [];
  for (let i = 1; i <= 20; i++) {
    quantityOptions.push(<option value={i} key={i}>{i}</option>);
  }
  return {
    product: products.find(product => product.id === id),
    cart,
    quantityOptions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLineItem: (lineitem) => dispatch(createLineItem(lineitem, history)),
    keepLoggedIn: () => dispatch(keepLoggedIn()),
    addLineItemToCart: lineItem => dispatch(addLineItemToCart(lineItem, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);