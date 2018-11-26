import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import * as constants from '../../constants';

export const searchReducer = (state = '', action) => {
  switch (action.type) {
    case constants.SEARCH_MOVIES:
      return action.payload;
    default:
      return state;
  }
};

export const moviesListReducer = (state = [], action) => {
  switch (action.type) {
    case constants.SEARCH_SUCCESS:
      return action.payload;
    case constants.SET_ERROR:
      return [];
    default:
      return state;
  }
};

export const movieReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.MOVIE_RECEIVED:
      return action.payload;
    case constants.SET_ERROR:
      return {};
    default:
      return state;
  }
};

export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case constants.FETCHING:
      return true;
    case constants.SEARCH_SUCCESS:
    case constants.MOVIE_RECEIVED:
    case constants.SET_ERROR:
      return false;
    default:
      return state;
  }
};

export const errorReducer = (state = '', action) => {
  switch (action.type) {
    case constants.SET_ERROR:
      return action.payload;
    default:
      return state;
  }
};

export default history =>
  combineReducers({
    search: searchReducer,
    moviesList: moviesListReducer,
    movie: movieReducer,
    loading: loadingReducer,
    error: errorReducer,
    router: connectRouter(history),
  });
