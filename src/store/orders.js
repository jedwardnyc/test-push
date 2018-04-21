import axios from 'axios';
import { GET_ORDERS, CREATE_ORDER, UPDATE_ORDER, DELETE_ORDER} from './constants';

export default orderReducer = ( state = [], action ) => {
  switch(action.type) {
    case GET_ORDERS:
      return action.orders;
    case CREATE_ORDER:
      return [...state, action.order];
    case UPDATE_ORDER:
      return state.map(order => order.id === action.order.id ? action.order : order);
    case DELETE_ORDER:
      return state.filter(order => order.id !== action.order.id)
    default:
      return state;
  };
};