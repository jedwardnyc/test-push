import axios from 'axios';
import { GET_SEARCH_RESULTS, CREATE_SEARCH_RESULT, DELETE_SEARCH_RESULT } from './constants';

export const fetchSearchResults = () => {
  return (dispatch) => {
    return axios.get('/api/products/searchResults')
      .then(res => res.data)
      .then(searchResults => {
        dispatch({ type: GET_SEARCH_RESULTS, searchResults });
      })
      .catch(err => console.log(err));
  };
};

export const createSearchResult = (searchResult) => {
  return (dispatch) => {
    return axios.post('/api/products/searchResults', searchResult)
      .then(res => res.data)
      .then(searchResult => dispatch({ type: CREATE_SEARCH_RESULT, searchResult }))
      .catch(err => console.log(err));
  };
};

export const deleteSearchResult = (searchResult) => {
  return (dispatch) => {
    return axios.delete(`/api/products/searchResults/${searchResult.id}`)
      .then(() => dispatch({ type: DELETE_SEARCH_RESULT, searchResult }))
      .catch(err => console.log(err));
  };
};

const searchResultReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return action.searchResults;
    case CREATE_SEARCH_RESULT:
      return [...state, action.searchResult];
    case DELETE_SEARCH_RESULT:
      return state.filter(searchResult => searchResult.id !== action.searchResult.id);
    default:
      return state;
  }
};

export default searchResultReducer;
