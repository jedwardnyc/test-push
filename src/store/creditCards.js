import axios from 'axios';
import { GET_CREDIT_CARDS, CREATE_CREDIT_CARD, UPDATE_CREDIT_CARD, DELETE_CREDIT_CARD } from './constants';

export const fetchCreditCards = (user) => {
  return (dispatch) => {
    return axios.post('/api/creditcards/get', user)
      .then(res => res.data)
      .then(creditCards => dispatch({ type: GET_CREDIT_CARDS, creditCards }))
      .catch(err => console.log(err));
  };
};

export const createCreditCard = (creditCard, history) => {
  return (dispatch) => {
    return axios.post('/api/creditcards', creditCard)
      .then(res => res.data)
      .then(creditCard => dispatch({ type: CREATE_CREDIT_CARD, creditCard }))
      .catch(err => console.log(err));
  };
};

export const updateCreditCard = creditCard => {
  return (dispatch) => {
    return axios.put(`/api/creditcards/${creditCard.id}`, creditCard)
      .then(res => res.data)
      .then(creditCard => dispatch({ type: UPDATE_CREDIT_CARD, creditCard }))
      .catch(err => console.log(err));
  };
};

export const deleteCreditCard = creditCard => {
  return (dispatch) => {
    return axios.delete(`/api/creditcards/${creditCard.id}`)
      .then(() => dispatch({ type: DELETE_CREDIT_CARD, creditCard }))
      .catch(err => console.log(err));
  };
};

const creditCardReducer = ( state = [], action ) => {
  switch (action.type) {
    case GET_CREDIT_CARDS:
      return action.creditCards;
    case CREATE_CREDIT_CARD:
      return [...state, action.creditCard];
    case UPDATE_CREDIT_CARD:
      return state.map(creditCard => creditCard.id === action.creditCard.id ? action.creditCard : creditCard);
     case DELETE_CREDIT_CARD:
      return state.filter(creditCard => creditCard.id !== action.creditCard.id);
    default:
      return state;
  }
};

export default creditCardReducer;
