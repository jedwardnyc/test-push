import axios from 'axios';
import { GET_ADDRESSES, CREATE_ADDRESS, UPDATE_ADDRESS, DELETE_ADDRESS} from './constants';

export const fetchAddresses = (user) => {
  return (dispatch) => {
    return axios.post('/api/addresses/get', user)
    .then(res => res.data)
    .then(addresses => dispatch({ type: GET_ADDRESSES, addresses }))
    .catch(err => console.log(err));
  };
};

export const createAddress = (address) => {
  return (dispatch) => {
    return axios.post('/api/addresses', address)
    .then(res => res.data)
    .then(address => dispatch({ type: CREATE_ADDRESS, address }))
    .catch(err => console.log(err));
  };
};

export const updateAddress = (address) => {
  return (dispatch) => {
    return axios.put(`/api/addresses/${address.id}`, address)
    .then(res => res.data)
    .then(address => dispatch({ type: UPDATE_ADDRESS, address }))
    .catch(err => console.log(err));
  };
};

export const deleteAddress = (address) => {
  return (dispatch) => {
    return axios.delete(`/api/addresses/${address.id}`)
    .then(() => dispatch({ type: DELETE_ADDRESS, address }))
    .catch(err => console.log(err));
  };
};

const addressReducer = ( state = [], action ) => {
  switch(action.type) {
    case GET_ADDRESSES:
      return action.addresses;
    case CREATE_ADDRESS:
      return [...state, action.address];
    case UPDATE_ADDRESS:
      return state.map(address => address.id === action.address.id ? action.address : address);
    case DELETE_ADDRESS:
      return state.filter(address => address.id !== action.address.id);
    default:
      return state;
  }
};

export default addressReducer;