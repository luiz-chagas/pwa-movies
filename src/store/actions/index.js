import * as constants from '../../constants';
import { findMovies, getMovie } from '../../api';

export function updateSearch(title) {
  return {
    type: constants.SEARCH_MOVIES,
    payload: title,
  };
}

export function searchSuccess(list) {
  return {
    type: constants.SEARCH_SUCCESS,
    payload: list,
  };
}

export function movieSuccess(movie) {
  return {
    type: constants.MOVIE_RECEIVED,
    payload: movie,
  };
}

export function startFetching() {
  return {
    type: constants.FETCHING,
  };
}

export function setError(val) {
  return {
    type: constants.SET_ERROR,
    payload: val,
  };
}

export const retrieveMovieList = title => async (dispatch) => {
  dispatch(setError(null));
  dispatch(updateSearch(title));
  dispatch(startFetching());
  const result = await findMovies(title);
  if (result.Search) {
    return dispatch(searchSuccess(result.Search));
  }
  return dispatch(setError(result.Error));
};

export const retrieveMovie = id => async (dispatch) => {
  dispatch(setError(null));
  dispatch(startFetching());
  const result = await getMovie(id);
  if (result.Error) {
    return dispatch(setError(result.Error));
  }
  return dispatch(movieSuccess(result));
};
