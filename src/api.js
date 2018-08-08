export default function getMovie(title = '') {
  return (
    title &&
    fetch(`https://www.omdbapi.com/?t=${title.toLocaleLowerCase()}&apikey=dce3d0be`, {
      crossDomain: true,
      method: 'GET',
    }).then(response => response.json())
  );
}
