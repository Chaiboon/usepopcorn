import { useState, useEffect } from "react";

const key = "fede68c4";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // callback?.();
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

      fetchMovie();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, error, loading };
}
