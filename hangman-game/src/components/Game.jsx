import React, { useEffect, useState } from "react";
import { getWord } from "../lib/getWord";
import GameBoard from "./GameBoard";
import CategoryOverlay from "./CategoryOverlay";

export default function Game() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrongGuesses = 6;

  const maxHints = 3; // total hints per round
  const [hintsLeft, setHintsLeft] = useState(maxHints);

  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null); // null = default/API

  // Fetch word from API or fallback
  const fetchWord = async () => {
    setLoading(true);
    try {
      const newWord = await getWord();
      console.log("Fetched word:", newWord);
      setWord(newWord);
    } finally {
      setLoading(false);
      setGuessedLetters([]);
      setWrongGuesses(0);
      setHintsLeft(maxHints);
    }
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const handleGuess = (letter) => {
    console.log("you clicked letter " + letter);
    if (guessedLetters.includes(letter)) return; //ignore already guessed letters
    setGuessedLetters((prev) => [...prev, letter]);

    if (!word.toUpperCase().includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  const useHint = () => {
    if (hintsLeft <= 0) return; // no hints left

    const remainingLetters = word
      .toUpperCase()
      .split("")
      .filter((letter) => !guessedLetters.includes(letter));

    if (remainingLetters.length === 0) return; // all letters already guessed

    const randomLetter =
      remainingLetters[Math.floor(Math.random() * remainingLetters.length)];
    
    setGuessedLetters((prev) => [...prev, randomLetter]);
    setHintsLeft((prev) => prev - 1);
  };

  const isWinner = word
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isLoser = wrongGuesses >= maxWrongGuesses;

  const displayWord = word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  const resetGame = async () => {
    if (!selectedCategoryName) {
      await fetchWord(); // default/API category
    } else {
      setGuessedLetters([]);
      setWrongGuesses(0);
      setHintsLeft(maxHints);
    }
  };

  const handleSelectCategory = (words, name) => {
    if (!name) {
      // Default/API category
      setSelectedCategoryName(null);
      fetchWord();
      return;
    }

    // Custom category
    setSelectedCategoryName(name);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setHintsLeft(maxHints);
  };

  if (loading) return <p>Loading word...</p>;

  return (
    <>
      <GameBoard
        displayWord={displayWord}
        wrongGuesses={wrongGuesses}
        maxWrongGuesses={maxWrongGuesses}
        isWinner={isWinner}
        isLoser={isLoser}
        guessedLetters={guessedLetters}
        word={word}
        handleGuess={handleGuess}
        resetGame={resetGame}
        useHint={useHint}
        hintsLeft={hintsLeft}
        maxHints={maxHints}
        openCategoriesOverlay={() => setShowCategories(true)}
        selectedCategoryName={selectedCategoryName}
      />

      {showCategories && (
        <CategoryOverlay
          onClose={() => setShowCategories(false)}
          onSelectCategory={(words, name) => {
            handleSelectCategory(words, name);
            setShowCategories(false);
          }}
        />
      )}
    </>
  );
}
