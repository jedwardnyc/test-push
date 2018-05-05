import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Products = ({ categories, products }) => {
  return (
    <div>
      <div id='productCarousel' className='carousel slide carousel-crop' data-ride='carousel'>
        <ol className='carousel-indicators'>
          <li data-target='#productCarousel' data-slide-to='0' className='active' />
          <li data-target='#productCarousel' data-slide-to='1' />
          <li data-target='#productCarousel' data-slide-to='2' />
        </ol>
        <div className='carousel-inner'>
          <div className='carousel-item carousel-crop-img1 active'>
            <img className='d-block' src='/public/images/organ.jpg' alt='Organs' />
          </div>
          <div className='carousel-item carousel-crop-img2'>
            <img className='d-block' src='/public/images/drugs.jpg' alt='Drugs' />
          </div>
          <div className='carousel-item carousel-crop-img3'>
            <img className='d-block' src='/public/images/laundry.jpg' alt='Laundering' />
          </div>
        </div>
      </div>
      <div className='container'>
        {
          categories && categories.map(category => {
            return (
              <div key={category.id}>
                <div className='border-bottom p-2 mr-auto row'>
                  <div className='col-md-2'>
                    <h4>{category.name}</h4>
                  </div>
                  <div className='col-md-9' />
                  <div className='col-md-1'>
                    <NavLink className='btn btn-outline-secondary' to={`/products/categories/${category.id}`}>
                      More</NavLink>
                  </div>
                </div>
                <div className='d-flex flex-row mr-auto p-2'>
                  {
                    products && products.filter(product => product.category_id === category.id).map(product => {
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
          })
        }
      </div>
    </div>
  );
}

const mapStateToProps = ({ categories, products }) => {
  const filteredProducts = [];
  products.filter(product => product.availability === true).reduce((total, current) => {
    if (!total[current.category_id]) {
      total[current.category_id] = 0;
    }
    total[current.category_id]++;
    if (total[current.category_id] < 5) {
      filteredProducts.push(current)
    }
    return total;
  }, {});
  return {
    categories,
    products: filteredProducts
  };
};

export default connect(mapStateToProps)(Products);
