import axios from 'axios';
import { GET_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, GET_PRODUCTS} from './constants';

export const fetchCategories = () => {
  return (dispatch) => {
    return axios.get('/api/categories')
    .then(res => res.data)
    .then(categories => dispatch({ type: GET_CATEGORIES, categories }))
    .catch(err => console.log(err));
  };
};

export const createCategory = (category) => {
  return (dispatch) => {
    return axios.post('/api/categories', category)
    .then(res => res.data)
    .then(category => dispatch({ type: CREATE_CATEGORY, category }))
    .catch(err => console.log(err));
  };
};

export const updateCategory = (category) => {
  return (dispatch) => {
    return axios.put(`/api/categories/${category.id}`, category)
    .then(res => res.data)
    .then(category => dispatch({ type: UPDATE_CATEGORY, category }))
    .catch(err => console.log(err));
  };
};

export const deleteCategory = (category) => {
  return (dispatch) => {
    return axios.delete(`/api/categories/${category.id}`)
    .then(() => dispatch({ type: DELETE_CATEGORY, category }))
    .catch(err => console.log(err));
  };
};

const categoryReducer = ( state = [], action ) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories;
    case CREATE_CATEGORY:
      return [...state, action.category];
    case UPDATE_CATEGORY:
      return state.map(category => category.id === action.category.id ? action.category : category);
    case DELETE_CATEGORY:
      return state.filter(category => category.id !== action.category.id);
    default:
      return state;
  }
};

export default categoryReducer;
