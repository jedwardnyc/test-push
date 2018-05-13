import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import auth from './auth';
import users from './users';
import products from './products';
import categories from './categories';
import lineItems from './lineitems';
import orders from './orders';
import cart from './cart';
import addresses from './addresses';
import creditCards from './creditCards';
import starRatings from './starRatings';
import searchResults from './searchResults';

const reducer = combineReducers({
  auth,
  users,
  products,
  categories,
  lineItems,
  orders,
  cart,
  addresses,
  creditCards,
  starRatings,
  searchResults
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './users';
export * from './products';
export * from './categories';
export * from './lineitems';
export * from './orders';
export * from './cart';
export * from './addresses';
export * from './creditCards';
export * from './starRatings';
export * from './searchResults';
