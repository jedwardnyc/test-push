import axios from 'axios';
import { SET_CART } from './constants';

// get cart (order with 'CART' status) and cart's line items
const setCart = user => {
  console.log('setCart', user);
  return dispatch => {
    return axios.post('/api/orders/cart', user)
    .then(res => res.data)
    .then(cart => {
      dispatch({
        type: SET_CART,
        cart
      });
      return cart;
    })
    .catch(err => console.log(err)); // throw error
  };
};

const cartReducer = ( state =  [], action ) => {
  switch (action.type) {
    case SET_CART:
    return action.cart;
    default:
      return state;
  }
};

export default cartReducer;
export { setCart };
