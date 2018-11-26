import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

const PropTypes = {
  info: propTypes.shape({
    Ratings: propTypes.array,
    Title: propTypes.string,
    Poster: propTypes.string,
    Runtime: propTypes.string,
    Director: propTypes.string,
    Actors: propTypes.string,
    Rated: propTypes.string,
    Awards: propTypes.string,
    Year: propTypes.string,
  }),
  imdbID: propTypes.string,
  getMovie: propTypes.func,
};

const DefaultProps = {
  info: {},
  imdbID: '',
  getMovie: () => {},
};

class Movie extends React.Component {
  componentDidMount() {
    this.props.getMovie(this.props.imdbID);
  }

  render() {
    const ratings =
      this.props.info.Ratings &&
      this.props.info.Ratings.map((item) => {
        let value = 0;
        let cssClass = '';
        if (item.Value) {
          value = item.Value.replace('.', '');
        }
        if (value) {
          value = Number.parseFloat(value);
        }
        if (value < 41) cssClass = 'red';
        if (value > 64) cssClass = 'green';
        if (value > 40 && value < 65) cssClass = 'yellow';
        return (
          <div key={Math.random()}>
            <p className={`${cssClass} rating`}>{item.Value}</p>
            <p className={cssClass}>{item.Source}</p>
          </div>
        );
      });

    const movieTitle =
      this.props.info.Title && `${this.props.info.Title} (${this.props.info.Year})`;

    const poster = this.props.info.Poster && this.props.info.Poster;

    const movieInfo = this.props.info.Title && [
      <tr key="runtime">
        <td>Runtime:</td>
        <td>{this.props.info.Runtime ? this.props.info.Runtime : 'N/A'}</td>
      </tr>,
      <tr key="director">
        <td>Director:</td>
        <td>{this.props.info.Director ? this.props.info.Director : 'N/A'}</td>
      </tr>,
      <tr key="actors">
        <td>Actors:</td>
        <td>{this.props.info.Actors ? this.props.info.Actors : 'N/A'}</td>
      </tr>,
      <tr key="rating">
        <td>Rated:</td>
        <td>{this.props.info.Rated ? this.props.info.Rated : 'N/A'}</td>
      </tr>,
    ];

    return (
      <div>
        <h2>{movieTitle}</h2>
        <div className="Movie-ratings">{ratings}</div>
        {poster && <img src={poster} alt="Movie Poster" />}
        <h5>{this.props.info.Awards}</h5>
        <div className="Movie-info">
          <table>
            <tbody>{movieInfo}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

Movie.propTypes = PropTypes;
Movie.defaultProps = DefaultProps;

export function mapStateToProps(state, props) {
  return {
    info: state.movie,
    imdbID: props.match.params.id,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    getMovie: imdbID => dispatch(actions.retrieveMovie(imdbID)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Movie);
