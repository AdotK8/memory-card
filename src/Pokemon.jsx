import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles/App.scss";
import { randomiseOrder, getRandomPokemonIds } from "./Helpers";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [round, setRound] = useState(0);
  const [randomisedPokemon, setRandomisedPokemon] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentRoundScore, setCurrentRoundScore] = useState([0, 5]);
  const displayPokemon =
    randomisedPokemon.length > 0 ? randomisedPokemon : pokemons;

  const fetchPokemons = async (pokemonIds) => {
    const newPokemons = [];
    for (const id of pokemonIds) {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await fetch(url);
        const data = await response.json();

        newPokemons.push({
          id: uuidv4(), // Unique ID for internal use
          name: data.name,
          imageUrl: data.sprites.other.dream_world.front_default,
          number: id,
          clicked: false,
        });
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
    }
    return newPokemons;
  };

  const handleNextRoundClick = async () => {
    //function to start new round
    console.log("new round should start");
    //get new pokemons for next round
    const newPokemonIds = getRandomPokemonIds([], currentRoundScore[1] + 2);
    console.log(newPokemonIds);
    const newPokemons = await fetchPokemons(newPokemonIds);
    setPokemons(newPokemons);

    //set round to trigger render
    setRound((prevRound) => prevRound + 1);

    //set currentScore
    setCurrentRoundScore([0, currentRoundScore[0] + 2]);
  };

  const handlePokemonClick = (id) => {
    setPokemons((prevPokemons) => {
      return prevPokemons.map((pokemon) => {
        if (pokemon.id === id) {
          if (pokemon.clicked) {
            console.error(`${pokemon.name} has already been clicked!`);
          } else {
            // Set clicked to true for the clicked Pokémon and update score states
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

  //check is round is over
  useEffect(() => {
    if (currentRoundScore[0] === currentRoundScore[1]) {
      handleNextRoundClick();
    }
  }, [currentRoundScore]);

  // On the first render, fetch 5 pokemons
  useEffect(() => {
    if (round === 0) {
      const initialIds = getRandomPokemonIds([], 5);
      fetchPokemons(initialIds).then((initialPokemons) => {
        setPokemons(initialPokemons);
      });
    }
  }, []);

  useEffect(() => {
    if (pokemons.length > 0) {
      const shuffled = randomiseOrder(pokemons);
      setRandomisedPokemon(shuffled);
    }
  }, [round]);

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

      <div className="card-section">
        {displayPokemon.map((pokemon) => (
          <div className="card" key={pokemon.id}>
            <img
              className="card-image"
              src={pokemon.imageUrl}
              alt={pokemon.name}
              onClick={() => handlePokemonClick(pokemon.id)}
            />
            <p className="card-name">{pokemon.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
