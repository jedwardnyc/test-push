import axios from 'axios';
import { SET_PRODUCTS } from './constants';

const productReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      state = action.products;
  }
  return state;
}

export const fetchProducts = () => {
  return (dispatch) => {
    return axios.get('/api/products')
      .then(result => result.data)
      .then(products => dispatch({
        type: SET_PRODUCTS,
        products
      }))
  }
};

export default productReducer;
