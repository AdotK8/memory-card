import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles/App.scss";

//function which takes in existing Ids and a count of how many pokemon to be added
function getRandomPokemonIds(existingIds = [], count) {
  const uniqueNumbers = new Set(existingIds);
  while (uniqueNumbers.size < count + existingIds.length) {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    uniqueNumbers.add(randomNum);
  }
  // Ensure we only get the new IDs by removing existing ones
  const newUniqueNumbers = [...uniqueNumbers].filter(
    (id) => !existingIds.includes(id)
  );
  return newUniqueNumbers;
}

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [round, setRound] = useState(0);
  const [randomisedPokemon, setRandomisedPokemon] = useState([]);

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
      pokemons.map((p) => p.id),
      2
    );
    const newPokemons = await fetchPokemons(newPokemonIds);

    // Append new pokemons to the existing list
    setPokemons((prevPokemons) => [...prevPokemons, ...newPokemons]);

    // Increment round for further tracking
    setRound((prevRound) => prevRound + 1);
  };

  useEffect(() => {
    if (round === 0) {
      // On the first render, fetch 6 pokemons
      const initialIds = getRandomPokemonIds([], 6);
      fetchPokemons(initialIds).then((initialPokemons) => {
        setPokemons(initialPokemons);
      });
    }
  }, []); // Ensures this effect only runs once on initial mount

  useEffect(() => {
    // Randomize the order of pokemons when the state changes
    if (pokemons.length > 0) {
      randomiseOrder();
    }
  }, [pokemons]);

  //function which takes pokemon array and randomises the order with Fisher-Yates shuffle
  function randomiseOrder() {
    const shuffledPokemons = [...pokemons];
    let i = shuffledPokemons.length - 1;
    let j, temp;

    while (i > 0) {
      j = Math.floor(Math.random() * (i + 1));

      temp = shuffledPokemons[j];
      shuffledPokemons[j] = shuffledPokemons[i];
      shuffledPokemons[i] = temp;

      i--;
    }

    setRandomisedPokemon(shuffledPokemons);
  }

  return (
    <div>
      <button onClick={handleAddClick}>Add Pokémon</button>
      {randomisedPokemon.map((pokemon) => (
        <div key={pokemon.id}>
          <img src={pokemon.imageUrl} alt={pokemon.name} />
          <p>{pokemon.name}</p>
        </div>
      ))}
    </div>
  );
}
