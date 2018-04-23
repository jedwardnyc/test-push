import React from 'react';
import { connect } from 'react-redux';
import { createLineItem } from '../store/lineitems';
class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    this.setState({ quantity: ev.target.value });
  }

  onSave(ev) {
    ev.preventDefault();
    const lineitem = { quantity: this.state.quantity, product_id: this.props.id }
    this.props.createLineItem(lineitem);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ quantity: nextProps.lineitem ? nextProps.lineitem.quantity : 1});
  }

  render() {
    const { product } = this.props;
    const { quantity } = this.state;

    //option
    const options = [];
    for (let i = 2; i < 21; i++) {
      options.push(<option value={i} key={i}>{i}</option>)
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
            <select className='form-control col-sm-1 p-2 mr-2' onChange={this.onChange}>
              <option value='1'>1</option>
              {
                options.map(option => {
                  return (
                    option
                  );
                })
              }
            </select>
            <button className='btn btn-primary p-2 mr-2' onClick={this.onSave}>Add to Cart</button>
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
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createLineItem: (lineitem) => dispatch(createLineItem(lineitem, history))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
