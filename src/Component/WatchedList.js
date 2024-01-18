import { Watched } from "./Watched";

export function WatchedList({ watched, onDeleteWatch }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Watched
          key={movie.imdbId}
          movie={movie}
          onDeleteWatch={onDeleteWatch}
        />
      ))}
    </ul>
  );
}
