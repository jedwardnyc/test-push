import axios from 'axios';
import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER} from './constants';

export default userReducer = ( state = [], action ) => {
  switch(action.type) {
    case GET_USERS:
      return action.users;
    case CREATE_USER:
      return [...state, action.user];
    case UPDATE_USER:
      return state.map(user => user.id === action.user.id ? action.user : user);
    case DELETE_USER:
      return state.filter(user => user.id !== action.user.id)
    default:
      return state;
  };
};