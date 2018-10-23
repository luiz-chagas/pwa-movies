export function findMovies(title = '') {
  return (
    title &&
    fetch(`https://www.omdbapi.com/?s=${title.toLocaleLowerCase()}&apikey=dce3d0be`, {
      crossDomain: true,
      method: 'GET',
    }).then(response => response.json())
  );
}

export function getMovie(id = '') {
  return (
    id &&
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=dce3d0be`, {
      crossDomain: true,
      method: 'GET',
    }).then(response => response.json())
  );
}
