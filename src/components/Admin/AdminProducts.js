import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { createProduct } from '../../store/products';

class AdminProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.productState(this.props);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  productState(props) {
    return {
      name: props.product ? props.product.name : '',
      price: props.product ? props.product.price : '',
      description: props.product ? props.product.description : '',
      imgUrl: props.product ? props.product.imgUrl : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.productState(nextProps))
  }

  onChange(ev) {
    const state = this.state;
    const fileReader = new FileReader();

    switch (ev.target.name) {
      case 'imgUrl':
        if (ev.target.files[0]) {
          fileReader.readAsDataURL(ev.target.files[0]);
          fileReader.onload = function (ev) {
            state.imgUrl = ev.target.result;
            console.log(state.imgUrl)
          }
        }
        break;
      default:
        state[ev.target.name] = ev.target.value;
    }
    this.setState(state);
  }

  onSave(ev) {
    ev.preventDefault();
    const product = {
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      imgUrl: this.state.imgUrl
    }
    this.props.createProduct(product);
  }

  render() {
    const { products } = this.props;
    const { name, price, description, imgUrl } = this.state;
    return (
      <div className='container mt-3'>
        <div className='border-bottom p-2'>
          <h4>Add new product</h4>
          <form className='form-group' onSubmit={this.onSave}>
            <div className='input-group mb-3'>
              <input
                type='text' className='form-control'
                placeholder='Add Product name' onChange={this.onChange}
                name='name' value={name}
              />
              <input
                type='text' className='form-control'
                placeholder='Add Product price' onChange={this.onChange}
                name='price' value={price}
              />
            </div>
            <div className='input-group mb-3 row'>
              <h4 className='ml-3 mr-2'>Choose Image</h4>
              <input
                type='file'
                placeholder='Add Product image' onChange={this.onChange}
                name='imgUrl'
              />
            </div>
            <div className='input-group mb-3'>
              <input
                type='text' className='form-control'
                placeholder='Add Product description' onChange={this.onChange}
                name='description' value={description}
              />
              <button
              className='btn btn-outline-secondary'
              type='submit'>
              Create
              </button>
            </div>
          </form>
        </div>
        <div className='border-bottom p-2'>
          <h4>List of Products</h4>
        </div>

        <div className='row p-2 col-md-12'>
          {
            products && products.map(product => {
              return (
                <div className='col-md-3' key={product.id}>
                  <div className='card mr-2 p-2 mb-4 bg-light rounded box-shadow'>
                    <NavLink to={`/admin/products/${product.id}`} className='text-center'>
                      <img className='card-img-top' src={product.imgUrl} width='150' height='150' />
                      {product.name}</NavLink>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    products
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createProduct: (product) => dispatch(createProduct(product)),
    uploadImg: (imgUrl) => dispatch(uploadImg(imgUrl))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
