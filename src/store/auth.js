import axios from 'axios';
import nodemailer from 'nodemailer';
import { config } from '../../server/auth/config';
import { AUTHENTICATED, UNAUTHENTICATED, GET_LOGGED_IN } from './constants';

export const login = ({ email, password }, history ) => {
  return (dispatch) => {
    return axios.post(`/auth/local/login`, { email, password })
    .then(res => res.data)
    .then(user => {
      dispatch(getLoggedIn(user))
      localStorage.setItem('user', user.token);
      history.push('/');
    })
    .then(() => dispatch({ type: AUTHENTICATED }))
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

export const getLoggedIn = (token) => {
  return (dispatch) => {
    return axios.post('/auth/local/me', token)
    .then(res => res.data)
    .then(user => dispatch({ type: AUTHENTICATED, user }))
  };
};

export const forgot = (email) => {
  return (dispatch) => {
    return axios.post('/auth/local/forgot', email)
    .then(res => res.data)
    .then(user => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: 'smtp.sendgrid.net',
          port: 587,
          secure: false, 
          auth: {
              user: 'apikey', 
              pass: config.gridKey 
          }
      });

      let mailOptions = {
      };
  
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
      });
    });
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
  };
};

export default authReducer;
