import React, { useState, useRef } from "react";
import App from "./Pokemon";
import "./styles/App.scss";
import soundOnIcon from "./assets/images/music-on.png";
import soundOffIcon from "./assets/images/music-off.png";
import backgroundMusic from "./assets/sounds/bg-music.mp3";

export default function Start() {
  //initializing state variables
  const [modal, setModal] = useState(true);
  const [gameStatus, setGameStatus] = useState(true);
  const [musicToggleIcon, setMusicToggleIcon] = useState(true);

  const audioRef = useRef(null);

  function handleClick() {
    setModal(false);
    if (audioRef.current) {
      audioRef.current.play();
    }
  }

  function handleMusicToggle() {
    setMusicToggleIcon((prev) => !prev);
    if (audioRef.current) {
      if (musicToggleIcon) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} src={backgroundMusic} loop />
      <img
        className="music-icon"
        src={musicToggleIcon ? soundOnIcon : soundOffIcon}
        onClick={handleMusicToggle}
        alt="Music Toggle Icon"
      />

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
        <App gameStatus={gameStatus} setGameStatus={setGameStatus} />
      )}
    </>
  );
}
