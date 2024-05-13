import React, { useState, useEffect } from "react";
import "./styles/App.scss";

export default function Start() {
  return (
    <>
      <div className="start-screen">
        <div className="modal">
          <h2>Welcome to the PokéMemo</h2>
          <p>
            Challenge your memory by clicking on different Pokémon cards each
            round. Avoid clicking on the same Pokémon twice, or it's game over.
          </p>
          <p>Think you can remember them all? Let's find out!</p>
          <button className="start-button">Start</button>
        </div>
      </div>
    </>
  );
}
