import React from 'react';
import { connect } from 'react-redux';
import { createLineItem, keepLoggedIn } from '../store';

class Product extends React.Component {
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
    ev.preventDefault();
    const lineitem = { quantity: this.state.quantity, product_id: this.props.id, order_id: this.props.cart.id };
    this.props.createLineItem(lineitem);
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
      <div className='container border rounded mt-5 ml-5 bg-light col-sm-10 row'>
        <div className='col-sm-6'>
          <img className='mr-auto p-3' src={product.imgUrl} width='500' height='400' />
        </div>
        <div className='col-sm-6'>
          <h3 className='text-center p-3'>{product.name}</h3>
          <br />
          <div className='rounded mr-1 row'>
            <h5 className='mr-1'>Price: ${product.price}</h5>
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
    keepLoggedIn: () => dispatch(keepLoggedIn())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
