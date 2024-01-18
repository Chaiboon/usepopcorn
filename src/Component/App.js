import { useEffect, useState } from "react";
import { NavBar } from "./Navbar/Navbar";
import { Search } from "./Navbar/Search";
import { NumResult } from "./Navbar/NumResult";
import { Loader, ErrorMessage } from "./Loader";
import { MovieList } from "./MovieList";
import { MovieDetails } from "./MovieDetails";
import { Summary } from "./Summary";
import { WatchedList } from "./WatchedList";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const key = "fede68c4";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectedId(movieId) {
    setSelectedId((selectedId) => (movieId === selectedId ? null : movieId));
  }
  function selectCloseMovie() {
    setSelectedId(null);
  }
  function handleWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDelete(id) {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovie() {
        try {
          setError("");
          setLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went worng with fetching movies!");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Search not found!");
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.name === "AbortError") {
            setError(err);
            console.log(err.message);
          }
        } finally {
          setLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      selectCloseMovie();
      fetchMovie();
      return function () {
        controller.abort();
      };
    },
    [query]
  );
  function handleQuery(e) {
    e.preventDefault();
    setQuery(e.target.value);
  }

  return (
    <>
      <NavBar>
        <Search query={query} handleQuery={handleQuery} />
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
