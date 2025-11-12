// fall back option
const wordsList = ["javascript", "react", "hangman", "component", "state"];

// makes it all upper case and cleans any - or ' or spaces from words like `rock-n-roll`, `queen's`, or `ice cream` just in case
function cleaner(w) {
  return w.replace(/[^a-zA-Z]/g, "").toUpperCase();
}

export async function fetchRandomWordOnce({ min = 4, max = 10 } = {}) {
  // min & max = minimum and maximun letters in the fetched word

  // setting a random length within our defined range
  const setLength = Math.floor(Math.random() * (max - min + 1)) + min;

  const url = `https://random-word-api.herokuapp.com/word?number=1&length=${setLength}`;

  // calling the API
  const res = await fetch(url);

  // if network or HTTP error, give up for now
  if (!res.ok) return null;

  // the API returns an array with the word like ["keyboard"]
  const arr = await res.json();

  // get the string safely
  const raw = Array.isArray(arr) ? arr[0] : "";

  // remove non letters and uppercase
  const clean = cleaner(raw);

  // return both, so we can compare lengths next and search for a new word in case the one we got has - or ' or spaces
  // looks like this { raw: "ice-cream", clean: "icecream" }
  return { raw, clean };
}

export async function getWord({ min = 4, max = 10 } = {}) {
  
    // trying to get a word up to 5 times with the API before fall back
  for (let i = 0; i < 5; i += 1) {
    const result = await fetchRandomWordOnce({ min, max });
    
    // skips a failed fetching, if the network fails
    if (!result) continue; 

    const { raw, clean } = result;

    if (clean && clean.length === raw.length) {
      // if no characters were removed then it returns the word
      return clean; 
    }
  }

  // if the API doesn't work, we pick a local fallback word 
  const pickFallbackWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  return cleaner(pickFallbackWord);
}
