import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchResult = ({ searchResults }) => {
  return(
    <div className='container mt-5 mr-auto'>
      <h4 className='mr-2 border-bottom mb-3 p-2 row'>Search results ({searchResults.length || ''})
        <div className='col-md-8' />
        <div className='col-md-1'>
          <Link className='btn btn-outline-secondary ml-5' to={'/products'}>
            Main Menu</Link>
        </div>
      </h4>
      <div className='row'>
        {
          searchResults && searchResults.map(product => {
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

const mapStateToProps = ({ searchResults }) => {
  return {
    searchResults
  }
}

export default connect(mapStateToProps)(SearchResult);
