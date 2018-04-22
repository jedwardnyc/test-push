import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import auth from './auth';
<<<<<<< HEAD
import categories from './categories';
import products from './products';

const reducer = combineReducers({
  categories,
  products,
  auth
=======
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
>>>>>>> 42e16cbe0e5afa4f9df675f7a696fb257b781f1c
});

const store = createStore(reducer, applyMiddleware(thunk, logger));
export default store;

export * from './auth';
<<<<<<< HEAD
export * from './categories';
export * from './products';
=======
export * from './users';
export * from './products';
export * from './categories';
export * from './lineitems';
export * from './orders';
>>>>>>> 42e16cbe0e5afa4f9df675f7a696fb257b781f1c
