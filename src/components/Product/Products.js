import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Products = ({ categories, products }) => {
  return (
    <div>
      <div id='carouselExampleIndicators' className='carousel slide' data-ride='carousel'>
        <ol className='carousel-indicators'>
          <li data-target='#carouselExampleIndicators' data-slide-to='0' className='active' />
          <li data-target='#carouselExampleIndicators' data-slide-to='1' />
          <li data-target='#carouselExampleIndicators' data-slide-to='2' />
        </ol>
        <div className='carousel-inner'>
          <div className='carousel-item active'>
            <img className='d-block w-100' src='https://images-na.ssl-images-amazon.com/images/G/01/img17/books/world-book-day-2018/WBD_Hero_3000x600_EN_Final._CB497245145_.jpg' alt='First slide' />
          </div>
          <div className='carousel-item'>
            <img className='d-block w-100' src='https://images-na.ssl-images-amazon.com/images/G/01/PLF/Core10/Gateway/02_C10_DT_HERO_2x._CB487095306_.jpg' alt='Second slide' />
          </div>
          <div className='carousel-item'>
            <img className='d-block w-100' src='https://images-na.ssl-images-amazon.com/images/G/01/digital/video/merch/subs/benefit-id/g-l/hbo/heroes/asin2018/Gateway-superhero_AVD-11254_WestworldS2_Gateway_3000x600._CB497252468_.jpg' alt='Third slide' />
          </div>
        </div>
      </div>
      <div className='container'>
        {
          categories && categories.map(category => {
            return (
              <div key={category.id}>
                <div className='border-bottom p-2 mr-auto row'>
                  <h4>{category.name}</h4>
                  <button className='btn btn-outline-secondary'>
                    <Link to={`/products/categories/${category.id}`}>
                      More</Link>
                  </button>
                </div>
                <div className='d-flex flex-row mr-auto p-2'>
                  {
                    products && products.filter(product => product.category_id === category.id).map(product => {
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
          })
        }
      </div>
    </div>
  );
}

const mapStateToProps = ({ categories, products }) => {
  return {
    categories,
    products: products.filter(product => product.availability === true)
  };
};

export default connect(mapStateToProps)(Products);