import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Product = ({ category, filteredProducts }) => {

  if (!category) {
    return null;
  }
  return (
    <div className='container mt-5 mr-auto'>
      <h4 className='mr-2 border-bottom mb-3 p-2 row'>{category.name}
        <div className='col-md-9' />
        <div className='col-md-1'>
          <NavLink className='btn btn-outline-secondary ml-5' to={'/products'}>
            Main Menu</NavLink>
        </div>
      </h4>
      <div className='row'>
        {
          filteredProducts && filteredProducts.map(product => {
            return (
              <div className='col-md-3' key={product.id}>
                <div className='card mr-2 p-2 mb-4 bg-light rounded box-shadow'>
                  <NavLink to={`/products/${product.id}`} className='text-center'>
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

const mapStateToProps = ({ categories, products }, { id }) => {
  const category = categories.find(category => category.id === id);
  const filteredProducts = products.filter(product => product.availability === true).filter(product => product.category_id === id);
  return {
    category,
    filteredProducts,
    products
  }
}

export default connect(mapStateToProps)(Product);
