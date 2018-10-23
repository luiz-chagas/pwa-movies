import React from 'react';

import './MoviesList.css';

const MoviesList = ({ movies, onClick }) => {
  const listItems = movies.map(item => (
    <div
      className="movie"
      key={item.imdbID}
      onClick={onClick.bind(this, item.imdbID)}
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
