const wordsList = ["javascript", "react", "hangman", "component", "state"];

/* function cleaner(w) {
  return w.replace(/[^a-zA-Z]/g, "").toUpperCase();
} */

function validateWord(word, fallback) {
  const regex = /^[a-zA-Z]+$/; // only letters

  if (regex.test(word)) {
    return word.toUpperCase();
  } else {
    return fallback.toUpperCase();
  }
}

export async function getWord(url) {

    const fallbackWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  return new Promise(async resolve => {

    const timer = setTimeout(() => {
      resolve(fallbackWord); // if timer wins, return the fallback
    }, 5000);

    try {
      const response = await fetch(url);
      const json = await response.json();
      const movieTitle = json[0].original_title;

      clearTimeout(timer);
      console.log(`API jsonfakery fetched word: ${movieTitle}`);

      resolve(validateWord(movieTitle, fallbackWord)); // if fetch wins, validate word and then return winner
    } catch (err) {
      clearTimeout(timer);
      resolve(fallbackWord); // if fetch fails, return fallback word
    }
  });
}
