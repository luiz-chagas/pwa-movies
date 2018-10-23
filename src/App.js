import React, { Component } from 'react';
// import logo from './logo.svg';
import Movie from './Movie';
import MoviesList from './MoviesList';
import './App.css';
import { findMovies, getMovie } from './api';
import loadingGif from './loading.gif';
import logo from './logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      info: {},
      loading: false,
      movies: [],
    };

    this.fetchData = this.fetchData.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.getMovie = this.getMovie.bind(this);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.fetchData();
    }
  }

  async getMovie(id) {
    try {
      this.setState({ info: {}, loading: true, movies: [] });
      const result = await getMovie(id);
      this.setState({ info: { ...result }, loading: false });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  async fetchData() {
    try {
      this.setState({ info: {}, loading: true, movies: [] });
      const result = await findMovies(this.state.search);
      if (result.Response === 'False') {
        return this.setState({ info: { Error: result.Error }, loading: false });
      }
      return this.setState({ movies: result.Search, loading: false });
    } catch (e) {
      return this.setState({ loading: false });
    }
  }

  render() {
    const loading = this.state.loading && (
      <div>
        <img className="loading" src={loadingGif} alt="Loading" />
        <p className="small">Sorry, it&#39;s taking a while</p>
      </div>
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} alt="Watchable Logo" />
          <div className="App-input">
            <label htmlFor="movieSearch" className={this.state.search ? 'label-top' : ''}>
              Movie Name
            </label>
            <input
              id="movieSearch"
              name="movieSearch"
              type="text"
              value={this.state.search}
              onChange={e => this.setState({ search: e.target.value })}
              onKeyPress={this.onKeyPress}
            />
            <button onClick={this.fetchData}>
              <span role="img" className="text-white" aria-label="search">
                🔎
              </span>
            </button>
          </div>
        </header>
        <div className="App-result">
          {loading}
          <MoviesList movies={this.state.movies} onClick={this.getMovie} />
          <Movie info={this.state.info} />
          <div className="Movie-error"> {this.state.info.Error && this.state.info.Error} </div>
        </div>
      </div>
    );
  }
}

export default App;
