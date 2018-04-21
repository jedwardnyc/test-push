import axios from 'axios';
import { GET_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY} from './constants';

export default categoryReducer = ( state = [], action ) => {
  switch(action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case CREATE_CATEGORY:
      return [...state, action.category];
    case UPDATE_CATEGORY:
      return state.map(category => category.id === action.category.id ? action.category : category);
    case DELETE_CATEGORY:
      return state.filter(category => category.id !== action.category.id)
    default:
      return state;
  };
};