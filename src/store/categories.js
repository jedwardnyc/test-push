import axios from 'axios';
<<<<<<< HEAD
import { SET_CATEGORIES } from './constants';

const categoryReducer = (state = [], action ) => {
  switch (action.type) {
    case SET_CATEGORIES:
      state= action.categories;
  }
  return state;
}
=======
import { GET_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY} from './constants';
>>>>>>> 42e16cbe0e5afa4f9df675f7a696fb257b781f1c

export const fetchCategories = () => {
  return (dispatch) => {
    return axios.get('/api/categories')
<<<<<<< HEAD
      .then(result => result.data)
      .then(categories => dispatch({
        type: SET_CATEGORIES,
        categories
      }))
  }
=======
    .then(res => res.data)
    .then(categories => dispatch({ type: GET_CATEGORIES, categories }))
    .catch(err => console.log(err))
  };
};

export const createCategory = (category) => {
  return (dispatch) => {
    return axios.post('/api/categories', category)
    .then(res => res.data)
    .then(category => dispatch({ type: CREATE_CATEGORY, category }))
    .catch(err => console.log(err))
  };
};

export const updateCategory = (category) => {
  return (dispatch) => {
    return axios.put(`/api/categories${category.id}`, category)
    .then(res => res.data)
    .then(category => dispatch({ type: UPDATE_CATEGORY, category }))
    .catch(err => console.log(err))
  };
};

export const deleteCategory = (category) => {
  return (dispatch) => {
    return axios.delete(`/api/categories${category.id}`)
    .then(() => dispatch({ type: DELETE_CATEGORY, category }))
    .catch(err => console.log(err))
  };
};

const categoryReducer = ( state = [], action ) => {
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
>>>>>>> 42e16cbe0e5afa4f9df675f7a696fb257b781f1c
};

export default categoryReducer;
