import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App-v1";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating="20" /> */}
  </React.StrictMode>
);
