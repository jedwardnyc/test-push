import axios from 'axios';
import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATION_ERROR } from './constants';

export const login = ({ email, password }, history ) => {
  return (dispatch) => {
    return axios.post(`/auth/local/login`, { email, password })
    .then(res => res.data)
    .then(user => {
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', user.token);
      history.push('/');
    })
    .catch(err => console.log(err))
  };
};

export const signUp = ({ email, password, firstname, lastname }, history ) => {
  return (dispatch) => {
    return axios.post(`/auth/local/register`, { email, password, firstname, lastname })
    .then(res => res.data)
    .then(user => {
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', user.token);
      history.push('/');
    })
    .catch(err => console.log(err))
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch({ type: UNAUTHENTICATED })
  };
};

export const keepLoggedIn = () => {
  return (dispatch) => {
    dispatch({ type: AUTHENTICATED })
  };
};

const authReducer = ( state = {}, action ) => {
  switch (action.type) {
    case AUTHENTICATED:
      return Object.assign({}, state, { authenticated: true });
    case UNAUTHENTICATED:
      return Object.assign({}, state, { authenticated: false });
    case AUTHENTICATION_ERROR:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
};

export default authReducer;
