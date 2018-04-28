import axios from 'axios';
import { CREATE_IMAGE } from './constants';

export const uploadImg = (imgUrl) => {
  return (dispatch) => {
    return axios.post('/api/uploads', imgUrl)
      .then(res => res.data)
      .then(imgUrl => dispatch({ type: CREATE_IMAGE, imgUrl }))
      .catch(err => console.log(err))
  }
}

const uploadReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_IMAGE:
      return [...state, action.imgUrl];
    default:
      return state;
  }
};

export default uploadReducer;
