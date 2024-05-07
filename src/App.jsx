import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  //initialise pokemon array
  let [pokemons, setPokemons] = useState([]);
  //initialise round number
  let [round, setRound] = useState(1);

  const url = "https://pokeapi.co/api/v2/pokemon/25";

  //function to add pokemon to array
  const addPokemon = (name, imageUrl) => {
    const newPokemon = {
      id: uuidv4(),
      name: name,
      imageUrl: imageUrl,
    };
    setPokemons([...pokemons, newPokemon]);
  };

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) =>
        addPokemon(data.name, data.sprites.other.dream_world.front_default)
      );
  }, []);

  console.log(pokemons);

  return <></>;
}
