import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import auth from './auth';

const reducer = combineReducers({
  auth
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;

export * from './auth';