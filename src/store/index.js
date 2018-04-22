import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import auth from './auth';
import users from './users';
import products from './products';
import categories from './categories';
import lineItems from './lineitems';
import orders from './orders';

const reducer = combineReducers({
  auth,
  users,
  products,
  categories,
  lineItems,
  orders
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;

export * from './auth';
export * from './users';
export * from './products';
export * from './categories';
export * from './lineitems';
export * from './orders';