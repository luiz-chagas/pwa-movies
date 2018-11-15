import { connect } from 'react-redux';
import MoviesList from '../components/MoviesList';
import * as action from '../actions';
import { getMovie } from '../api';

export function mapStateToProps({ moviesList }) {
  return {
    moviesList,
  };
}

const retrieveMovie = async (id) => {
  const result = await getMovie(id);
  return result;
};

export function mapDispatchToProps(dispatch) {
  return {
    loadMovie: async (id) => {
      dispatch(action.updateLoading(true));
      const movie = await retrieveMovie(id);
      dispatch(action.updateLoading(false));
      dispatch(action.updateView('movie'));
      return dispatch(action.updateMovie(movie));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoviesList);
