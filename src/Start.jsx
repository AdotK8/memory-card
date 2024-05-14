import React, { useState } from "react";
import App from "./Pokemon";
import "./styles/App.scss";

export default function Start() {
  const [modal, setModal] = useState(true);

  function handleClick() {
    setModal(false);
  }

  return (
    <>
      {modal ? (
        <div className="start-screen">
          <div className="modal">
            <h2>Welcome to the PokéMemo</h2>
            <p>
              Challenge your memory by clicking on different Pokémon cards each
              round. Avoid clicking on the same Pokémon twice, or it's game
              over.
            </p>
            <p>Think you can remember them all? Let's find out!</p>
            <button className="start-button" onClick={handleClick}>
              Start
            </button>
          </div>
        </div>
      ) : (
        <App />
      )}
    </>
  );
}
