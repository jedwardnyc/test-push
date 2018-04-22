import axios from 'axios';
import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER} from './constants';

export const fetchUsers = () => {
  return (dispatch) => {
    return axios.get('/api/users')
    .then(res => res.data)
    .then(users => dispatch({ type: GET_USERS, users }))
    .catch(err => console.log(err));
  };
};

export const createUser = (user) => {
  return (dispatch) => {
    return axios.post('/api/users', user)
    .then(res => res.data)
    .then(user => dispatch({ type: CREATE_USER, user }))
    .catch(err => console.log(err));
  };
};

export const updateUser = (user) => {
  return (dispatch) => {
    return axios.put(`/api/users${user.id}`, user)
    .then(res => res.data)
    .then(user => dispatch({ type: UPDATE_USER, user }))
    .catch(err => console.log(err));
  };
};

export const deleteUser = (user) => {
  return (dispatch) => {
    return axios.delete(`/api/users${user.id}`)
    .then(() => dispatch({ type: DELETE_USER, user }))
    .catch(err => console.log(err));
  };
};

const userReducer = ( state = [], action ) => {
  switch (action.type) {
    case GET_USERS:
      return action.users;
    case CREATE_USER:
      return [...state, action.user];
    case UPDATE_USER:
      return state.map(user => user.id === action.user.id ? action.user : user);
    case DELETE_USER:
      return state.filter(user => user.id !== action.user.id);
    default:
      return state;
  }
};

export default userReducer;
