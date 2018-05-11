import React from 'react';
import { connect } from 'react-redux';
import { updateProduct, deleteProduct } from '../../store/products';

class AdminEditProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.productState(this.props);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  productState(props) {
    return {
      name: props.product ? props.product.name : '',
      price: props.product ? props.product.price : '',
      description: props.product ? props.product.description : '',
      imgUrl: props.product ? props.product.imgUrl : '',
      category_id: props.product ? props.product.category_id : '',
      availability: props.product ? props.product.availability : '',
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.productState(nextProps))
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSave(ev) {
    ev.preventDefault();
    const product = {
      id: this.props.id,
      name: this.state.name,
      imgUrl: this.state.imgUrl,
      price: this.state.price,
      description: this.state.description,
      category_id: this.state.category_id,
      availability: this.state.availability
    }
    this.props.updateProduct(product);
  }

  onDelete(id) {
    this.props.deleteProduct({id});
  }

  render() {
    const { product, categories } = this.props;
    const { onChange, onSave } = this;
    const { name, imgUrl, price, description } = this.state;
    if (!product) {
      return null;
    }
    return (
      <div className='container border rounded mt-5 ml-5 bg-light col-sm-10 row'>
        <div className='col-sm-7'>
          <img className='mr-auto p-3' src={product.imgUrl} width='600' height='400' />
        </div>
        <div className='col-sm-5 mt-2 p-2'>
          <form className='form-group' onSubmit={onSave}>
            <h5 className='mr-2'>Product Name</h5>
            <input
              name='name'
              className='form-control'
              onChange={onChange}
              value={name}
            />
            <div className='row'>
              <div className='col-sm-4'>
                <h6 className='mt-2 mr-2'>Product Price</h6>
                <input
                  name='price'
                  className='form-control'
                  onChange={onChange}
                  value={price}
                />
              </div>
              <div className='col-sm-4'>
                <h6 className='mt-2 mr-2'>Category</h6>
                <select className='form-control' name='category_id' onChange={onChange}>
                  <option>{this.category(product, categories)}</option>
                  {
                    categories.map(category => {
                      return (
                        <option value={category.id} key={category.id}>{category.name}</option>
                      );
                    })
                  }
                </select>
              </div>

              <div className='col-sm-4'>
                <h6 className='mt-2 mr-2'>Availability</h6>
                <select className='form-control' name='availability' onChange={onChange}>
                  <option value={product.availability === false ? false : true} key='1'>{product.availability === false ? 'Not available' : 'available'}</option>
                  <option value={product.availability === false ? true : false} key='2'>{product.availability === false ? 'available' : 'Not available'}</option>
                </select>
              </div>
            </div>
            <h5 className='mt-2 mr-2'>Product Description</h5>
            <textarea
              name='description'
              className='form-control'
              onChange={onChange}
              value={description}
              rows='4'
            />
              <button onClick={()=> deleteProduct(product.id) } className='btn btn-primary float-right mt-3 ml-2'>Delete</button>
            <button className='btn btn-primary float-right mt-3'>Save Change</button>
          </form>
        </div>
      </div>
    );
  }

  category(product, categories) {
    const category = categories.find(category => category.id === product.category_id);
    if (!category) {
      return null;
    }
    return category.name;
  }
}

const mapStateToProps = ({ products, categories, starRatings }, { id }) => {
  const product = products.find(product => product.id === id);

  return {
    product,
    categories,
    starRatings
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateProduct: (product) => dispatch(updateProduct(product, history)),
    deleteProduct: (product) => dispatch(deleteProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditProducts);
