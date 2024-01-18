export function Loader() {
  return <p className="loader">LOADING...</p>;
}
export function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🚩</span>
      {message}
    </p>
  );
}
