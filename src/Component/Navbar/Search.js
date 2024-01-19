import { useEffect, useRef } from "react";

export function Search({ query, handleQuery }) {
  const inputEl = useRef(null);
  useEffect(function () {
    function callback(e) {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") inputEl.current.focus();
    }

    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => handleQuery(e)}
      ref={inputEl}
    />
  );
}
