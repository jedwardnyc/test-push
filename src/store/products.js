import axios from 'axios';
import { GET_PRODUCTS, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, DELETE_CATEGORY} from './constants';

export const fetchProducts = () => {
  return (dispatch) => {
    return axios.get('/api/products')
    .then(res => res.data)
    .then(products => {
      dispatch({ type: GET_PRODUCTS, products });
    })
    .catch(err => console.log(err));
  };
};

export const createProduct = (product) => {
  return (dispatch) => {
    return axios.post('/api/products', product)
    .then(res => res.data)
    .then(product => dispatch({ type: CREATE_PRODUCT, product }))
    .catch(err => console.log(err));
  };
};

export const updateProduct = (product, history) => {
  return (dispatch) => {
    return axios.put(`/api/products/${product.id}`, product)
    .then(res => res.data)
    .then(product => dispatch({ type: UPDATE_PRODUCT, product }))
    .then(() => history.push('/admin/products'))
    .catch(err => console.log(err));
  };
};

export const deleteProduct = (product) => {
  return (dispatch) => {
    return axios.delete(`/api/products/${product.id}`)
    .then(() => dispatch({ type: DELETE_PRODUCT, product }))
    .catch(err => console.log(err));
  };
};

const productReducer = ( state = [], action ) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    case CREATE_PRODUCT:
      return [...state, action.product];
    case UPDATE_PRODUCT:
      return state.map(product => product.id === action.product.id ? action.product : product);
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.product.id);
    default:
      return state;
  }
};

export default productReducer;
