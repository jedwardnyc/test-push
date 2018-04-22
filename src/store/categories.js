import axios from 'axios';
import { SET_CATEGORIES } from './constants';

const categoryReducer = (state = [], action ) => {
  switch (action.type) {
    case SET_CATEGORIES:
      state= action.categories;
  }
  return state;
}

export const fetchCategories = () => {
  return (dispatch) => {
    return axios.get('/api/categories')
      .then(result => result.data)
      .then(categories => dispatch({
        type: SET_CATEGORIES,
        categories
      }))
  }
};

export default categoryReducer;
