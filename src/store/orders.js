import axios from 'axios';
import { GET_ORDERS, CREATE_ORDER, UPDATE_ORDER, DELETE_ORDER} from './constants';

export const fetchOrders = (user) => {
  return (dispatch) => {
    return axios.post('/api/orders/get', user)
    .then(res => res.data)
    .then(orders => dispatch({ type: GET_ORDERS, orders }))
    .catch(err => console.log(err));
  };
};

export const createOrder = (order) => {
  return (dispatch) => {
    return axios.post('/api/orders', order)
    .then(res => res.data)
    .then(order => dispatch({ type: CREATE_ORDER, order }))
    .catch(err => console.log(err));
  };
};

export const updateOrder = (order) => {
  return (dispatch) => {
    return axios.put(`/api/orders/${order.id}`, order)
    .then(res => res.data)
    .then(order => dispatch({ type: UPDATE_ORDER, order }))
    .catch(err => console.log(err));
  };
};

export const deleteOrder = (order) => {
  return (dispatch) => {
    return axios.delete(`/api/orders/${order.id}`)
    .then(() => dispatch({ type: DELETE_ORDER, order }))
    .catch(err => console.log(err));
  };
};

const orderReducer = ( state = [], action ) => {
  switch(action.type) {
    case GET_ORDERS:
      return action.orders;
    case CREATE_ORDER:
      return [...state, action.order];
    case UPDATE_ORDER:
      return state.map(order => order.id === action.order.id ? action.order : order);
    case DELETE_ORDER:
      return state.filter(order => order.id !== action.order.id);
    default:
      return state;
  }
};

export default orderReducer;
