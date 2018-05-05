import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Product = ({ category, filteredProducts }) => {

  if (!category) {
    return null;
  }
  return (
    <div className='container'>
      <h4 className='border border-bottom mr-2'>{category.id}</h4>

    </div>
  );
}

const mapStateToProps = ({ categories, products }, { id }) => {
  console.log(id)
  const category = categories.find(category => category.id === id);
  const filteredProducts = products.filter(product => product.category_id === id);
  return {
    category,
    filteredProducts
  }
}

export default connect(mapStateToProps)(Product);


/**<div className='row'>
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
      </div> */
