import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [round, setRound] = useState(0);
  const [pokemonIds, setPokemonIds] = useState([]);

  function getRandomPokemonId() {
    if (pokemonIds.length === 0) {
      const uniqueNumbers = new Set();
      while (uniqueNumbers.size < 6) {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        uniqueNumbers.add(randomNum);
      }
      return Array.from(uniqueNumbers);
    }
    return pokemonIds; // Avoid generating new IDs if already set
  }

  const fetchInitialPokemons = async () => {
    const newPokemons = [];
    const uniquePokemonIds = getRandomPokemonId();

    // Fetch Pokémon data for each unique ID
    for (const id of uniquePokemonIds) {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const response = await fetch(url);
      const data = await response.json();

      newPokemons.push({
        id: uuidv4(), // Generate unique ID for internal data
        name: data.name,
        imageUrl: data.sprites.other.dream_world.front_default,
        clicked: 0,
      });
    }

    setPokemons(newPokemons);
    setPokemonIds(uniquePokemonIds);
  };

  useEffect(() => {
    fetchInitialPokemons();
  }, []); // Ensures this runs only once on mount

  function handleClick() {
    setRound(round + 1); // This won't cause fetch on component mount
  }

  console.log(pokemons);
  console.log(pokemonIds);

  return (
    <>
      <button onClick={handleClick}>Add Pokémon</button>
      {pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <img src={pokemon.imageUrl} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </>
  );
}
