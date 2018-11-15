import * as constants from '../constants';

export function updateSearch(val) {
  return {
    type: constants.UPDATE_SEARCH,
    value: val,
  };
}

export function updateMovie(val) {
  return {
    type: constants.UPDATE_MOVIE,
    value: val,
  };
}

export function setMovies(val) {
  return {
    type: constants.SET_MOVIES,
    value: val,
  };
}

export function updateLoading(val) {
  return {
    type: constants.SET_LOADING,
    value: val,
  };
}

export function updateView(val) {
  return {
    type: constants.SET_VIEW,
    value: val,
  };
}
