import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import auth from './auth';
import categories from './categories';
import products from './products';

const reducer = combineReducers({
  categories,
  products,
  auth
});

const store = createStore(reducer, applyMiddleware(thunk, logger));
export default store;

export * from './auth';
export * from './categories';
export * from './products';
