import axios from 'axios';
import { GET_STAR_RATINGS, CREATE_STAR_RATING, UPDATE_STAR_RATING, DELETE_STAR_RATING } from './constants';

export const fetchStarRatings = () => {
  return (dispatch) => {
    return axios.get('/api/starRatings')
      .then(res => res.data)
      .then(starRatings => {
        dispatch({ type: GET_STAR_RATINGS, starRatings });
      })
      .catch(err => console.log(err));
  };
};

export const createStarRating = (starRating) => {
  return (dispatch) => {
    return axios.post('/api/starRatings', starRating)
      .then(res => res.data)
      .then(starRating => dispatch({ type: CREATE_STAR_RATING, starRating }))
      .catch(err => console.log(err));
  };
};

export const updateStarRating = (starRating) => {
  return (dispatch) => {
    return axios.put(`/api/starRatings/${starRating.id}`, starRating)
      .then(res => res.data)
      .then(starRating => dispatch({ type: UPDATE_STAR_RATING, starRating }))
      .catch(err => console.log(err));
  };
};

export const deleteStarRating = (starRating) => {
  return (dispatch) => {
    return axios.delete(`/api/starRatings/${starRating.id}`)
      .then(() => dispatch({ type: DELETE_STAR_RATING, starRating }))
      .catch(err => console.log(err));
  };
};

const starRatingReducer = (state = [], action) => {
  switch (action.type) {
    case GET_STAR_RATINGS:
      return action.starRatings;
    case CREATE_STAR_RATING:
      return [...state, action.starRating];
    case UPDATE_STAR_RATING:
      return state.map(starRating => starRating.id === action.starRating.id ? action.starRating : starRating);
    case DELETE_STAR_RATING:
      return state.filter(starRating => starRating.id !== action.starRating.id);
    default:
      return state;
  }
};

export default starRatingReducer;
