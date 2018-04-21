import axios from 'axios';
import { GET_LINE_ITEMS, CREATE_LINE_ITEM, UPDATE_LINE_ITEM, DELETE_LINE_ITEM} from './constants';

export const fetchLineItems = () => {
  return (dispatch) => {
    return axios.get('/api/lineitems')
    .then(res => res.data)
    .then(lineItems => dispatch({ type: GET_LINE_ITEMS, lineItems }))
    .catch(err => console.log(err))
  };
};

export const createLineItem = (lineItem) => {
  return (dispatch) => {
    return axios.post('/api/lineitems', lineItem)
    .then(res => res.data)
    .then(lineItem => dispatch({ type: CREATE_LINE_ITEM, lineItem }))
    .catch(err => console.log(err))
  };
};

export const updatelineItem = (lineItem) => {
  return (dispatch) => {
    return axios.put(`/api/lineitems${lineItem.id}`, lineItem)
    .then(res => res.data)
    .then(lineItem => dispatch({ type: UPDATE_LINE_ITEM, lineItem }))
    .catch(err => console.log(err))
  };
};

export const deletelineItem = (lineItem) => {
  return (dispatch) => {
    return axios.delete(`/api/lineitems${lineItem.id}`)
    .then(() => dispatch({ type: DELETE_LINE_ITEM, lineItem }))
    .catch(err => console.log(err))
  };
};

const lineItemReducer = ( state = [], action ) => {
  switch(action.type) {
    case GET_LINE_ITEMS:
      return action.lineItems;
    case CREATE_LINE_ITEM:
      return [...state, action.lineItem];
    case UPDATE_LINE_ITEM:
      return state.map(lineItem => lineItem.id === action.lineItem.id ? action.lineItem : lineItem);
    case DELETE_LINE_ITEM:
      return state.filter(lineItem => lineItem.id !== action.lineItem.id)
    default:
      return state;
  };
};

export default lineItemReducer;
