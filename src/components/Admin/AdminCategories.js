import React from 'react';
import { connect } from 'react-redux';
import { createCategory, deleteCategory } from '../../store/categories'
import { updateProduct } from '../../store/products';

class AdminCategories extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSave(ev) {
    ev.preventDefault();
    const category = { name: this.state.name };
    this.props.createCategory(category);
    this.setState({name: ''});
  }

  onDelete(id) {
    this.props.products.forEach( product => {
      if (product.category_id === id) this.props.updateProduct({ id, category_id: 1 });
    });
    this.props.deleteCategory({ id });
  }

  render() {
    console.log(this.props.products)
    const { categories } = this.props;
    const { name } = this.state;
    return (
      <div className='container'>
        <div className='border-bottom p-2 mr-auto'>
          <h4>List of Categories</h4>
          <div className='input-group mb-3'>
            <input
              type='text' className='form-control'
              placeholder='Add Category name' onChange={this.onChange}
              name='name' value={name}
            />
            <div className='input-group-append'>
              <button onClick={this.onSave} className='btn btn-outline-secondary' type='button'>Create</button>
            </div>
          </div>
        </div>
        <div className='d-flex flex-column mr-auto p-2 col-md-10'>
          {
            categories && categories.map(category => {
              return (
                <div className='col-md-3' key={category.id}>
                  <h5>{category.name}
                    <button onClick={() => this.onDelete(category.id)}type='button' className='close' aria-label='Close'>
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </h5>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ categories, products }) => {
  return {
    categories,
    products
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createCategory: (category) => dispatch(createCategory(category)),
    deleteCategory: (category) => dispatch(deleteCategory(category)),
    updateProduct: (product) => dispatch(updateProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategories);
