//helper functions for App.jsx

//function which takes in existing Ids and a count of how many pokemon to be added
export function getRandomPokemonIds(existingIds = [], count) {
  const uniqueNumbers = new Set(existingIds);
  while (uniqueNumbers.size < count + existingIds.length) {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    uniqueNumbers.add(randomNum);
  }
  //create array of new pokemons
  const newUniqueNumbers = [...uniqueNumbers].filter(
    (id) => !existingIds.includes(id)
  );
  return newUniqueNumbers;
}

//function which takes in array of pokemon and returns a shuffled version
//Using Fisher-Yates shuffle
export function randomiseOrder(arr) {
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
