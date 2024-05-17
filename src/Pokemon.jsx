import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import { randomiseOrder, getRandomPokemonIds } from "./Helpers";
import { fetchPokemons } from "./Helpers";
import gameOverGif from "./assets/images/ditto-sad.gif";

export default function App({ gameStatus, setGameStatus }) {
  //inititializing state variables
  const [pokemons, setPokemons] = useState([]);
  const [round, setRound] = useState(0);
  const [randomisedPokemon, setRandomisedPokemon] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentRoundScore, setCurrentRoundScore] = useState([0, 5]);

  let displayPokemon =
    randomisedPokemon.length > 0 ? randomisedPokemon : pokemons;

  //function to start new round
  const handleNextRoundClick = async () => {
    console.log("new round should start");
    //get new pokemons for next round
    const newPokemonIds = getRandomPokemonIds([], currentRoundScore[1] + 2);
    console.log(newPokemonIds);
    const newPokemons = await fetchPokemons(newPokemonIds);
    setPokemons(newPokemons);

    //update states and trigger render
    setRound((prevRound) => prevRound + 1);
    setCurrentRoundScore([0, currentRoundScore[0] + 2]);
  };

  //function to handle pokemon click
  const handlePokemonClick = (id) => {
    setPokemons((prevPokemons) => {
      return prevPokemons.map((pokemon) => {
        if (pokemon.id === id) {
          if (pokemon.clicked) {
            setGameStatus(false);
          } else {
            setCurrentRoundScore((prevRoundScore) => [
              prevRoundScore[0] + 1,
              prevRoundScore[1],
            ]);
            setCurrentScore((prevScore) => prevScore + 1);
            const shuffled = randomiseOrder(pokemons);
            setRandomisedPokemon(shuffled);
            return {
              ...pokemon,
              clicked: true,
            };
          }
        }
        return pokemon;
      });
    });
  };

  //start new game
  const handleGameEnd = () => {
    setCurrentScore(0);
    setCurrentRoundScore([0, 5]);
    setRound(0);
    setPokemons([]);
    setRandomisedPokemon([]);
    // Inform the parent component about the game over
    setGameStatus(true);
  };

  //check is round is over
  useEffect(() => {
    if (currentRoundScore[0] === currentRoundScore[1]) {
      handleNextRoundClick();
    }
  }, [currentRoundScore]);

  //load high score from local storage on intial render
  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore, 10));
    }
  }, []);

  // On the new game, fetch 5 pokemons
  useEffect(() => {
    if (round === 0) {
      const initialIds = getRandomPokemonIds([], 5);
      fetchPokemons(initialIds).then((initialPokemons) => {
        setPokemons(initialPokemons);
      });
    }
  }, [gameStatus]);

  //when round changes, shuffle pokemon order
  useEffect(() => {
    if (pokemons.length > 0) {
      const shuffled = randomiseOrder(pokemons);
      setRandomisedPokemon(shuffled);
    }
  }, [round]);

  //when current score changes, check if it is high score. And save to local store
  useEffect(() => {
    if (currentScore > highScore) {
      setHighScore(currentScore);
      localStorage.setItem("highScore", currentScore.toString());
    }
  }, [currentScore, highScore]);

  return (
    <>
      <div className="scores">
        <div className="current-score">SCORE:{currentScore}</div>
        <div className="high-score">HIGH SCORE:{highScore}</div>
        <img src="./src/assets/images/trophy.png" alt="Image" id="trophy" />
      </div>

      <div className="current-round">
        {currentRoundScore[0]} / {currentRoundScore[1]}
      </div>

      {gameStatus ? (
        <div className="card-section">
          {displayPokemon.map((pokemon) => (
            <div
              className="card"
              key={pokemon.id}
              onClick={() => handlePokemonClick(pokemon.id)}
            >
              <img
                className="card-image"
                src={pokemon.imageUrl}
                alt={pokemon.name}
              />
              <p className="card-name">{pokemon.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="game-over-screen">
          <div className="game-over-container">
            <div className="game-over">
              <h1>Game Over!</h1>
              <img src={gameOverGif} alt="Game Over Gif" />
              <p>Your final score is {currentScore}</p>
              <button className="start-button" onClick={handleGameEnd}>
                Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
