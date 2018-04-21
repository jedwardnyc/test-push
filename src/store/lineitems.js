import axios from 'axios';
import { GET_LINE_ITEMS, CREATE_LINE_ITEM, UPDATE_LINE_ITEM, DELETE_LINE_ITEM} from './constants';

export default lineItemReducer = ( state = [], action ) => {
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