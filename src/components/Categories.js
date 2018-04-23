import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Categories = ({ categories, products }) => {
  if (!categories) {
    return null;
  }
  if (!products) {
    return null;
  }
  return (
    <div className='container'>
      <div className='p-3 my-3 rounded box-shadow align-items-center'>
        <img className='img-fluid' src='http://tinobusiness.com/wp-content/uploads/2015/09/CONSUMER-PRODUCTS-e1442909155136.jpg' alt='Max-width 100%' width='1000' />
      </div>
      <div>
        {
          categories.map(category => {
            return (
              <div key={category.id}>
                <div className='border-bottom p-2 mr-auto'>
                  <h4>{category.name}</h4>
                </div>
                <div className='d-flex flex-row mr-auto p-2'>
                  {
                    products.filter(product => product.category_id === category.id).map(product => {
                      return (
                        <div className='col-md-3' key={product.id}>
                          <div className='card mr-2 p-2 mb-4 bg-light rounded box-shadow'>
                            <Link to={`/products/${product.id}`} className='text-center'>
                              <img className='card-img-top' src={product.imgUrl} />
                              {product.name}</Link>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

const mapStateToProps = ({ categories, products }) => {
  return {
    categories,
    products
  };
};

export default connect(mapStateToProps)(Categories);
