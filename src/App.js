import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import api from './api';
import loadingGif from './loading.gif';
import logo from './logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { search: '', info: {}, loading: false };

    this.fetchData = this.fetchData.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.fetchData();
    }
  }

  async fetchData() {
    try {
      this.setState({ info: {}, loading: true });
      const result = await api(this.state.search);
      this.setState({ info: { ...result }, loading: false });
    } catch (e) {
      this.setState({ loading: false });
    }
  }

  render() {
    const ratings =
      this.state.info.Ratings &&
      this.state.info.Ratings.map((item) => {
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
      this.state.info.Title && `${this.state.info.Title} (${this.state.info.Year})`;

    const poster = this.state.info.Poster && this.state.info.Poster;

    const movieInfo = this.state.info.Title && [
      <tr key="runtime">
        <td>Runtime:</td>
        <td>{this.state.info.Runtime ? this.state.info.Runtime : 'N/A'}</td>
      </tr>,
      <tr key="director">
        <td>Director:</td>
        <td>{this.state.info.Director ? this.state.info.Director : 'N/A'}</td>
      </tr>,
      <tr key="actors">
        <td>Actors:</td>
        <td>{this.state.info.Actors ? this.state.info.Actors : 'N/A'}</td>
      </tr>,
    ];

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
          <h2>{movieTitle}</h2>
          <div className="Movie-ratings">{ratings}</div>
          {poster && <img src={poster} alt="Movie Poster" />}
          <h5>{this.state.info.Awards}</h5>
          <div className="Movie-info">
            <table>
              <tbody>{movieInfo}</tbody>
            </table>
          </div>
          <div className="Movie-error"> {this.state.info.Error && this.state.info.Error} </div>
        </div>
      </div>
    );
  }
}

export default App;
