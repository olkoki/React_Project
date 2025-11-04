import React, { useEffect, useState } from "react";
import { getWord } from "../lib/getWord";
import GameBoard from "./GameBoard";

export default function Game() {
  const [word, setWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrongGuesses = 6;

  const maxHints = 3; // total hints per round
  const [hintsLeft, setHintsLeft] = useState(maxHints);

  useEffect(() => {
    getWord().then((w) => {
      setWord(w);
      // so we can make sure everything is working
      console.log("Fetched word:", w);
      setLoading(false);
    });
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
    setLoading(true);
    setGuessedLetters([]);
    setWrongGuesses(0);
    setHintsLeft(maxHints);

    try {
      const newWord = await getWord();
      // so we can still see the new word
      console.log("New fetched word:", newWord);
      setWord(newWord);
    } finally {
      setLoading(false);
    }
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
      />
    </>
  );
}
