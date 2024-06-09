import { v4 as uuidv4 } from "uuid";

export function getRandomPokemonIds(existingIds = [], count) {
  /* takes in array of existing pokemon ID's and count, 
returns new array of random pokemon*/
  const uniqueNumbers = new Set(existingIds);
  while (uniqueNumbers.size < count + existingIds.length) {
    const randomNum = Math.floor(Math.random() * 151) + 1;
    uniqueNumbers.add(randomNum);
  }
  const newUniqueNumbers = [...uniqueNumbers].filter(
    (id) => !existingIds.includes(id)
  );
  return newUniqueNumbers;
}

export function randomiseOrder(arr) {
  /*  which takes in array of pokemon and returns a shuffled version
using Fisher-Yates shuffle */
  const shuffledArray = [...arr];
  let i = shuffledArray.length - 1;
  let j, temp;

  while (i > 0) {
    j = Math.floor(Math.random() * (i + 1));
    temp = shuffledArray[j];
    shuffledArray[j] = shuffledArray[i];
    shuffledArray[i] = temp;
    i--;
  }

  return shuffledArray;
}

export async function fetchPokemons(pokemonIds) {
  /* takes in pokemon ID array and fetches corresponding pokemon via pokeAPI, returns
  array of pokemon  */
  const newPokemons = [];
  for (const id of pokemonIds) {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const response = await fetch(url);
      const data = await response.json();

      newPokemons.push({
        id: uuidv4(),
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
}
