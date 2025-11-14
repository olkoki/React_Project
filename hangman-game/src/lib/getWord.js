// fall back option
const wordsList = ["javascript", "react", "hangman", "component", "state"];

// makes it all upper case and cleans any - or ' or spaces
function cleaner(w) {
  return w.replace(/[^a-zA-Z]/g, "").toUpperCase();
}

function fetchWithTimeout(url, options = {}, timeout = 3000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    )
  ]);
}

export async function fetchRandomWordOnce({ min = 4, max = 10 } = {}) {
  const setLength = Math.floor(Math.random() * (max - min + 1)) + min;
  const url = `https://random-word-api.herokuapp.com/word?number=1&length=${setLength}`;

  try {
    const res = await fetchWithTimeout(url, {}, 3000);

    if (!res.ok) return null;

    const arr = await res.json();
    const raw = Array.isArray(arr) ? arr[0] : "";
    const clean = cleaner(raw);

    return { raw, clean };

  } catch (err) {
    console.error("Fetch failed or timed out:", err);
    return null;
  }
}

export async function getWord({ min = 4, max = 10 } = {}) {
  for (let i = 0; i < 5; i++) {
    const result = await fetchRandomWordOnce({ min, max });

    if (!result) continue;

    const { raw, clean } = result;

    if (clean && clean.length === raw.length) {
      return clean;
    }
  }

  const fallbackWord =
    wordsList[Math.floor(Math.random() * wordsList.length)];

  return cleaner(fallbackWord);
}
