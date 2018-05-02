import axios from 'axios';
import bcrypt from 'bcryptjs';
import { AUTHENTICATED, UNAUTHENTICATED, GET_LOGGED_IN } from './constants';

export const login = ({ email, password }, history ) => {
  return (dispatch) => {
    return axios.post(`/auth/local/login`, { email, password })
    .then(res => res.data)
    .then(user => {
      dispatch(getLoggedIn(user));
      localStorage.setItem('user', user.token);
      history.push('/');
    })
    .then((user) => dispatch({ type: AUTHENTICATED, user }))
    .catch(err => console.log(err))
  };
};

export const signUp = ({ email, password, firstname, lastname }, history ) => {
  const hashedPassword = bcrypt.hashSync( password , 8);
  return (dispatch) => {
    return axios.post(`/auth/local/register`, { email, password: hashedPassword, firstname, lastname })
    .then(res => res.data)
    .then(user => {
      localStorage.setItem('user', user.token);
      dispatch(getLoggedIn(user));
      history.push('/');
    })
    .then(user => dispatch({ type: AUTHENTICATED, user }))
    .catch(err => console.log(err))
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch({ type: UNAUTHENTICATED });
  };
};

export const getLoggedIn = (token) => {
  return (dispatch) => {
    return axios.post('/auth/local/me', token)
    .then(res => res.data)
    .then(user => {
      dispatch({ type: AUTHENTICATED, user });
      return user;
    });
  };
};

export const forgot = (email) => {
  return (dispatch) => {
    return axios.post('/auth/local/forgot', email)
    .catch(err => console.log(err))
  }
};

export const reset = ({ password, token }) => {
  const hashedPassword = bcrypt.hashSync( password , 8);
  return (dispatch) => {
    return axios.post(`/auth/local/reset/${token}`, { password: hashedPassword })
    .catch(err => console.log(err))
  }
}

const authReducer = ( state = {}, action ) => {
  switch (action.type) {
    case AUTHENTICATED:
      return Object.assign({}, state, { user: action.user });
    case UNAUTHENTICATED:
      return Object.assign({}, state, { user: {} });
    default:
      return state;
  }
};

export default authReducer;
