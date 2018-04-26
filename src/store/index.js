import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import auth from './auth';
import users from './users';
import products from './products';
import categories from './categories';
import lineItems from './lineitems';
import orders from './orders';
import { CREATE_LINE_ITEM, UPDATE_VIRTUAL_LINE_ITEM } from './constants';

const reducer = combineReducers({
  auth,
  users,
  products,
  categories,
  lineItems,
  orders
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

const addToCart = ( productId, quantity, userId ) => {
  return dispatch => {
    let lineItem = { productId: productId, quantity: quantity * 1 };
    const isAuth = store.getState().auth.authenticated;
    // console.log('authenticated', isAuth, 'line_item', lineItem);
    if (!isAuth) {
      // when not authenticated,
      // find line items on the store without an order id (these are objects not stored on the db)
      const storeOnlyItems = store.getState().lineItems;
      const prodAdded = storeOnlyItems.find(item => item.productId === productId);
      if (storeOnlyItems.length && prodAdded) {
        // if line item has same productId && diff quantity, update line item
        if (prodAdded.quantity * 1 === quantity) return;
        prodAdded.quantity = quantity;
        dispatch({
          type: UPDATE_VIRTUAL_LINE_ITEM,
          lineItem
        });
      } else {
        // if no line items with productId, create new line item on store only
        dispatch({
          type: CREATE_LINE_ITEM,
          lineItem
        });
      }
    } else {
      // when authenticated,
      // look for order with user id
        // if no order exists, create order
        // if order exists
          // find line item in db with same orderId and prodId
            // if line item as same prodId && diff quantity ? update line item in db and store
            // if no line items with prodId ? create new line item on db and store
    }
  };
};

export default store;
export { addToCart };

export * from './auth';
export * from './users';
export * from './products';
export * from './categories';
export * from './lineitems';
export * from './orders';
