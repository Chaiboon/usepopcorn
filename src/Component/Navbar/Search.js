import { useRef } from "react";
import { useKey } from "../../CustomHook/useKey";

export function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });
  function handleQuery(e) {
    setQuery(e.target.value);
  }
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
