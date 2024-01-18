import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Component/App";
import StarRating from "./Component/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating="20" /> */}
  </React.StrictMode>
);
