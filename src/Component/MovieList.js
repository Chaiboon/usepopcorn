export function MovieList({ movies, handleSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          handleSelectedId={handleSelectedId}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
function Movie({ movie, handleSelectedId }) {
  return (
    <li key={movie.imdbID} onClick={() => handleSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
