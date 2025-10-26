import React, { useState } from "react";
import Keyboard from "./Keyboard";

const wordsList = ["JAVASCRIPT", "REACT", "HANGMAN", "COMPONENT", "STATE"]; //temporary

export default function Game() {
  const [word, setWord] = useState(
    wordsList[Math.floor(Math.random() * wordsList.length)]
  );
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxWrongGuesses = 6;

  const handleGuess = (letter) => {
    console.log("you clicked letter " + letter);
    if (guessedLetters.includes(letter)) return; //ignore already guessed letters
    setGuessedLetters((prev) => [...prev, letter]);

    if (!word.toUpperCase().includes(letter)) {
      setWrongGuesses((prev) => prev + 1);
    }
  };

  const isWinner = word
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isLoser = wrongGuesses >= maxWrongGuesses;

  const displayWord = word
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");

  const resetGame = () => {
    setWord(wordsList[Math.floor(Math.random() * wordsList.length)]);
    setGuessedLetters([]);
    setWrongGuesses(0);
  };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h1>Hangman Game</h1>
        <h2>{displayWord}</h2>
        <p>
          Wrong guesses: {wrongGuesses} / {maxWrongGuesses}
        </p>
        <Keyboard
          isWinner={isWinner}
          isLoser={isLoser}
          handleGuess={handleGuess}
          guessedLetters={guessedLetters}
          word={word}
        />
        {isWinner && <h3>Congratulations! You've won!</h3>}
        {isLoser && <h3>Game over! The word was: {word}</h3>}

        <button onClick={resetGame} style={{ marginTop: "20px" }}>
          Play Again
        </button>
      </div>
    </>
  );
}
