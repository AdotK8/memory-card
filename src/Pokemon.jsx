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
  const [currentRound, setCurrentRound] = useState([0, 5]);
  const displayPokemon =
    randomisedPokemon.length > 0 ? randomisedPokemon : pokemons;

  const fetchPokemons = async (pokemonIds) => {
    const newPokemons = [];
    for (const id of pokemonIds) {
      try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

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

  const handleAddClick = async () => {
    // Generate two new pokemon IDs
    const newPokemonIds = getRandomPokemonIds(
      pokemons.map((p) => p.number),
      2
    );
    const newPokemons = await fetchPokemons(newPokemonIds);

    setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);
    setRound((prevRound) => prevRound + 1);
  };

  const handlePokemonClick = (id) => {
    console.log(id);
    setPokemons((prevPokemons) => {
      return prevPokemons.map((pokemon) => {
        if (pokemon.id === id) {
          return {
            ...pokemon,
            clicked: true,
          };
        } else return pokemon;
      });
    });
  };

  const handleShowPokemonsCLick = () => {
    console.log(pokemons);
  };

  // On the first render, fetch 6 pokemons
  useEffect(() => {
    if (round === 0) {
      const initialIds = getRandomPokemonIds([], 5);
      fetchPokemons(initialIds).then((initialPokemons) => {
        setPokemons(initialPokemons);
      });
    }
  }, []);

  // Randomize the order of pokemons when the state changes
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
        <div className="high-score">HIGH SCORE:{currentScore}</div>
        <img src="./src/assets/images/trophy.png" alt="Image" id="trophy" />
      </div>

      <div className="current-round">
        {currentRound[0]} / {currentRound[1]}
      </div>

      <div className="card-section">
        {displayPokemon.map((pokemon) => (
          <div className="card" key={pokemon.id}>
            <img
              className="card-image"
              src={pokemon.imageUrl}
              alt={pokemon.name}
            />
            <p className="card-name">{pokemon.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}
