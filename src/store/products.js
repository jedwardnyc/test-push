import axios from 'axios';
import { GET_PRODUCTS, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT} from './constants';

export default productReducer = ( state = [], action ) => {
  switch(action.type) {
    case GET_PRODUCTS:
      return action.products;
    case CREATE_PRODUCT:
      return [...state, action.product];
    case UPDATE_PRODUCT:
      return state.map(product => product.id === action.product.id ? action.product : product);
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.product.id)
    default:
      return state;
  };
};