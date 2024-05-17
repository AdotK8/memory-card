import React from "react";
import ReactDOM from "react-dom/client";
import Start from "./Start";
import "./styles/App.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <section className="main">
    <img></img>
    <div className="header">
      <img src="./src/assets/images/pokeball.png" alt="Image" id="pokeball" />
      <div className="title">
        <span>Poké</span>
        <span>Memo</span>
      </div>
    </div>
    <Start />
  </section>
);
