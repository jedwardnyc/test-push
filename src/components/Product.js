import React from 'react';
import { connect } from 'react-redux';
import { createLineItem, addToCart, keepLoggedIn } from '../store';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSave(ev) {
    ev.preventDefault();
    const lineitem = { quantity: this.state.quantity, product_id: this.props.id }
    this.props.createLineItem(lineitem);
  }

  // not doing anything -bv
  // componentWillReceiveProps(nextProps) {
  //   this.setState({ quantity: nextProps.lineitem ? nextProps.lineitem.quantity : 1});
  // }

  addToCart(ev) {
    this.props.addToCart(
      this.props.product.id,
      this.state.quantity
      // user id
    );
  }

  render() {
    const { product } = this.props;
    const { onSave, addToCart, onChange } = this;

    // quantity drop down values
    const options = [];
    for (let i = 1; i <= 20; i++) {
      options.push(<option value={i} key={i}>{i}</option>);
    }

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
                options.map(option => {
                  return (
                    option
                  );
                })
              }
            </select>
            <button className='btn btn-primary p-2 mr-2' onClick={ onSave }>Add to Cart</button>
          </div>
          <br />
          <h5 className='border-top p-2 mr-1'>Description: {product.description}</h5>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }, { id }) => {
  return {
    product: products.find(product => product.id === id)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLineItem: (lineitem) => dispatch(createLineItem(lineitem, history)),
    keepLoggedIn: () => dispatch(keepLoggedIn()),
    addToCart: ( productId, quantity ) => dispatch(addToCart(productId, quantity))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
