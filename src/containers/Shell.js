import { connect } from 'react-redux';
import Shell from '../components/Shell';
import * as action from '../actions';
import { findMovies } from '../api';

export function mapStateToProps({
  movie, search, loading, view,
}) {
  return {
    movie,
    search,
    loading,
    view,
  };
}

const retrieveMovieList = name => async (dispatch) => {
  dispatch(action.updateLoading(true));
  const result = await findMovies(name);
  dispatch(action.updateLoading(false));
  dispatch(action.updateView('list'));
  if (result.Search) {
    return dispatch(action.setMovies(result.Search));
  }
  dispatch(action.updateMovie(result));
  return dispatch(action.setMovies([]));
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSearch: (e) => {
      if (e.key === 'Enter') {
        return retrieveMovieList(e.target.value)(dispatch);
      }
      return dispatch(action.updateSearch(e.target.value));
    },
    doSearch: name => retrieveMovieList(name)(dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shell);
