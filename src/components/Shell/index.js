/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import propTypes from 'prop-types';
import { Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Movie from '../Movie';
import MoviesList from '../MoviesList';
import * as action from '../../store/actions';
import loadingGif from './loading.gif';
import logo from './logo.png';

const PropTypes = {
  loading: propTypes.bool,
  search: propTypes.string,
  error: propTypes.oneOfType([propTypes.string, propTypes.any]),
  onChangeSearch: propTypes.func,
};

const DefaultProps = {
  loading: false,
  search: '',
  error: null,
  onChangeSearch: () => {},
};

// eslint-disable-next-line react/prefer-stateless-function
class Shell extends React.Component {
  render() {
    const showLoading = this.props.loading && (
      <div>
        <img className="loading" src={loadingGif} alt="Loading" />
        <p className="small">Sorry, it&#39;s taking a while</p>
      </div>
    );

    return (
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <img src={logo} alt="Watchable Logo" />
          </Link>
          <div className="App-input">
            <label htmlFor="movieSearch" className={this.props.search ? 'label-top' : ''}>
              Movie Name
            </label>
            <input
              id="movieSearch"
              name="movieSearch"
              type="text"
              value={this.props.search}
              onChange={this.props.onChangeSearch}
              onKeyPress={e => this.props.onChangeSearch(e)}
            />
            <Link to={`/search/${this.props.search}`} className="searchButton">
              <span role="img" aria-label="search">
                🔎
              </span>
            </Link>
          </div>
        </header>
        <div className="App-result">
          {showLoading}
          <div className="Movie-error"> {this.props.error} </div>
          <Switch>
            <Route exact path="/" render={() => null} />
            <Route path="/search/:title" component={MoviesList} />
            <Route path="/show/:id" component={Movie} />
          </Switch>
        </div>
      </div>
    );
  }
}

Shell.propTypes = PropTypes;
Shell.defaultProps = DefaultProps;

export function mapStateToProps({
  movie, search, loading, view, error, router,
}) {
  return {
    movie,
    search,
    loading,
    view,
    error,
    router,
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    onChangeSearch: (e) => {
      if (e.key === 'Enter') {
        return dispatch(push(`/search/${e.target.value}`));
      }
      return dispatch(action.updateSearch(e.target.value));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Shell);
