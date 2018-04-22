import React from 'react';
import { connect } from 'react-redux';
class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.lineitemState(this.props || 1);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  lineitemState(props) {
    return {
      quantity: 1
    }
  }

  onChange(ev) {
    this.state({ [ev.target.name]: ev.target.value });
  }

  onSave(ev) {
    ev.preventDefault();

  }

  render() {
    const { product } = this.props;
    const { quantity } = this.state;

    //option
    const options = [];
    for (let i = 2; i < 21; i++) {
        options.push(<option key={i}>{i}</option>)
    }

    if (!product) {
      return null;
    }
    return (
      <div className='container border rounded mt-5 bg-light col-sm-10 row'>
        <div className='col-sm-6'>
          <img className='mr-auto p-3' src={product.imgUrl} width='500' height='400' />
        </div>
        <div className='col-sm-6'>
          <h3 className='text-center p-3'>{product.name}</h3>
          <h4 className='mr-1'>Price: ${product.price}</h4>
          <h5 className='mr-1'>Description: {product.description}</h5>

          <div className='flex-reverse rounded mr-2 p-2 row'>
            <select>
              <option>1</option>
              {
                options.map( option => {
                  return (
                    option
                  );
                })
              }
            </select>
          </div>
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

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
