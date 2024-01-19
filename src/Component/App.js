import { useState } from "react";
import { NavBar } from "./Navbar/Navbar";
import { Search } from "./Navbar/Search";
import { NumResult } from "./Navbar/NumResult";
import { Loader, ErrorMessage } from "./Loader";
import { MovieList } from "./MovieList";
import { MovieDetails } from "./MovieDetails";
import { Summary } from "./Summary";
import { WatchedList } from "./WatchedList";
import { useMovies } from "../CustomHook/useMovies";
import { useLocalStorageState } from "../CustomHook/useLocalStorageState";

export const key = "fede68c4";
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorageState([], "watch");
  // const [watched, setWatched] = useState(function () {
  //   const storedValue = localStorage.getItem("watched");
  //   return JSON.parse(storedValue);
  // });
  const { movies, error, loading } = useMovies(query);
  function handleSelectedId(movieId) {
    setSelectedId((selectedId) => (movieId === selectedId ? null : movieId));
  }
  function selectCloseMovie() {
    setSelectedId(null);
  }
  function handleWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }
  function handleDelete(id) {
    console.log(id);
    console.log(watched);
    setWatched(watched.filter((movie) => movie.imdbId !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {loading && <Loader />}
          {!loading && !error && (
            <MovieList movies={movies} handleSelectedId={handleSelectedId} />
          )}
          {error && <ErrorMessage message={error.message} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              selectCloseMovie={selectCloseMovie}
              onAddwatched={handleWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList watched={watched} onDeleteWatch={handleDelete} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
