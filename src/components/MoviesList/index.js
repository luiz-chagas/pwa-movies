import React from 'react';

import './MoviesList.css';

const MoviesList = ({ moviesList, loadMovie }) => {
  const onClick = (id) => {
    loadMovie(id);
  };

  const listItems = moviesList.map(item => (
    <div
      className="movie"
      key={item.imdbID}
      onClick={onClick.bind(null, item.imdbID)}
      role="button"
    >
      <div>
        {item.Title} ({item.Year})
      </div>
      <div>{item.Poster.startsWith('http') && <img src={item.Poster} alt="Movie Poster" />}</div>
    </div>
  ));

  return <div className="container">{listItems}</div>;
};

export default MoviesList;
