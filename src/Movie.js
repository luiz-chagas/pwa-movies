import React from 'react';

const Movie = ({ info }) => {
  const ratings =
    info.Ratings &&
    info.Ratings.map((item) => {
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

  const movieTitle = info.Title && `${info.Title} (${info.Year})`;

  const poster = info.Poster && info.Poster;

  const movieInfo = info.Title && [
    <tr key="runtime">
      <td>Runtime:</td>
      <td>{info.Runtime ? info.Runtime : 'N/A'}</td>
    </tr>,
    <tr key="director">
      <td>Director:</td>
      <td>{info.Director ? info.Director : 'N/A'}</td>
    </tr>,
    <tr key="actors">
      <td>Actors:</td>
      <td>{info.Actors ? info.Actors : 'N/A'}</td>
    </tr>,
    <tr key="rating">
      <td>Rated:</td>
      <td>{info.Rated ? info.Rated : 'N/A'}</td>
    </tr>,
  ];

  return (
    <div>
      <h2>{movieTitle}</h2>
      <div className="Movie-ratings">{ratings}</div>
      {poster && <img src={poster} alt="Movie Poster" />}
      <h5>{info.Awards}</h5>
      <div className="Movie-info">
        <table>
          <tbody>{movieInfo}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Movie;
