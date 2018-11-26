import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './MoviesList.css';
import * as action from '../../store/actions';

const PropTypes = {
  moviesList: propTypes.arrayOf(propTypes.shape({ imdbID: propTypes.string })),
  searchMovies: propTypes.func,
  filter: propTypes.string,
};

const DefaultProps = {
  moviesList: [],
  searchMovies: () => {},
  filter: '',
};

class MoviesList extends React.Component {
  componentDidMount() {
    this.props.searchMovies(this.props.filter);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.props.searchMovies(this.props.filter);
    }
  }

  render() {
    const listItems = this.props.moviesList.map(item => (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Link className="movie" key={item.imdbID} to={`/show/${item.imdbID}`}>
        <div>
          {item.Title} ({item.Year})
        </div>
        <div>{item.Poster.startsWith('http') && <img src={item.Poster} alt="Movie Poster" />}</div>
      </Link>
    ));

    return <div className="container">{listItems}</div>;
  }
}

MoviesList.propTypes = PropTypes;
MoviesList.defaultProps = DefaultProps;

export function mapStateToProps(state, props) {
  return {
    moviesList: state.moviesList,
    filter: props.match.params.title,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    searchMovies: title => dispatch(action.retrieveMovieList(title)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoviesList);
