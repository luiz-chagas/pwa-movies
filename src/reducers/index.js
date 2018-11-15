import { combineReducers } from 'redux';
import * as constants from '../constants';

export const searchReducer = (state = '', action) => {
  switch (action.type) {
    case constants.UPDATE_SEARCH:
      return action.value;
    default:
      return state;
  }
};

export const moviesListReducer = (state = [], action) => {
  switch (action.type) {
    case constants.SET_MOVIES:
      return action.value;
    default:
      return state;
  }
};

export const movieReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.UPDATE_MOVIE:
      return action.value;
    default:
      return state;
  }
};

export const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case constants.SET_LOADING:
      return action.value;
    default:
      return state;
  }
};

export const viewReducer = (state = 'list', action) => {
  switch (action.type) {
    case constants.SET_VIEW:
      return action.value;
    default:
      return state;
  }
};

export const reducer = combineReducers({
  search: searchReducer,
  moviesList: moviesListReducer,
  movie: movieReducer,
  loading: loadingReducer,
  view: viewReducer,
});
