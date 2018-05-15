import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class SearchResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: () => true
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(ev) {
    ev.preventDefault();
    const value = +ev.target.value;
    this.setState({
      filter: product => product.category_id === value
    })
  }

  render() {
    const { products, categories } = this.props;
    let filteredProducts = products.filter(this.state.filter);
    return (
      <div className='container mt-5 mr-auto'>
        <h4 className='mr-2 border-bottom mb-3 p-2 row'>Search results ({filteredProducts.length || 0})
        <div className='col-md-8'>
            <div className='col-md-4'>
              <select
                className='form-control'
                name='category_id'
                onChange= {this.onChange}>
                {
                 <option value='0'>Category</option>
                }
                {
                  categories.map(category => {
                    return (
                      <option value={category.id} key={category.id}>{category.name}</option>
                    );
                  })
                }
              </select>
            </div>
          </div>
          <div className='col-md-1'>
            <Link className='btn btn-outline-secondary ml-5' to={'/products'}>
              Main Menu</Link>
          </div>
        </h4>
        <div className='row'>
          {
            filteredProducts && filteredProducts.map(product => {
              return (
                <div className='col-md-3' key={product.id}>
                  <div className='card mr-2 p-2 mb-4 bg-light rounded box-shadow'>
                    <Link to={`/products/${product.id}`} className='text-center'>
                      <img className='card-img-top' src={product.imgUrl} width='150' height='150' />
                      {product.name}</Link>
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

const mapStateToProps = ({ searchResults, categories, products }) => {
  const productsList = searchResults.reduce((result, searchResult) => {
    if(!result[searchResult.name]){
      result[searchResult.name] = searchResult.id
    }
    return result
  },{});
  const filteredProducts = products.filter(product => product.id === productsList[product.name]);

  const _productsList = filteredProducts.reduce((result, product) => {
    if (!result[product.category_id]) {
      result[product.category_id] = product.category_id
    }
    return result
  }, {});

  const filteredCategories = categories.filter(category => category.id === _productsList[category.id])

  return {
    products: filteredProducts,
    categories: filteredCategories
  }
}

export default connect(mapStateToProps)(SearchResult);
