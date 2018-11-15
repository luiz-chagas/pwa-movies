import React from 'react';
import Movie from '../../containers/Movie';
import MoviesList from '../../containers/MoviesList';
import loadingGif from './loading.gif';
import logo from './logo.png';

const Shell = ({
  loading, search, movie, view, onChangeSearch, doSearch,
}) => {
  const showLoading = loading && (
    <div>
      <img className="loading" src={loadingGif} alt="Loading" />
      <p className="small">Sorry, it&#39;s taking a while</p>
    </div>
  );

  const onSearchClicked = () => {
    doSearch(search);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Watchable Logo" />
        <div className="App-input">
          <label htmlFor="movieSearch" className={search ? 'label-top' : ''}>
            Movie Name
          </label>
          <input
            id="movieSearch"
            name="movieSearch"
            type="text"
            value={search}
            onChange={onChangeSearch}
            onKeyPress={onChangeSearch}
          />
          <button onClick={onSearchClicked}>
            <span role="img" className="text-white" aria-label="search">
              🔎
            </span>
          </button>
        </div>
      </header>
      <div className="App-result">
        {showLoading}
        {view === 'list' && <MoviesList />}
        {view === 'movie' && <Movie />}
        <div className="Movie-error"> {movie && movie.Error} </div>
      </div>
    </div>
  );
};

export default Shell;
