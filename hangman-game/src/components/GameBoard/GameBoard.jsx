import React, { useState } from "react";
import Keyboard from "../Keyboard";
import Stickman from "../Stickman/Stickman";
import Header from "../Header/Header";
import Hints from "../Hints";
import styles from "./GameBoard.module.scss";

export default function GameBoard({
  displayWord,
  wrongGuesses,
  maxWrongGuesses,
  isWinner,
  isLoser,
  guessedLetters,
  word,
  handleGuess,
  resetGame,
  hintsLeft,
  maxHints,
  useHint,
  openCategoriesOverlay,
  selectedCategoryName,
}) {
  const [hoverReset, setHoverReset] = useState(false);
  const [hoverHint, setHoverHint] = useState(false);
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <Header
        playerName="Alice" //placeholder
        category={selectedCategoryName || "Movies"}
        openCategoriesOverlay={openCategoriesOverlay}
        wrongGuesses={wrongGuesses}
        maxWrongGuesses={maxWrongGuesses}
      />
      <div className={styles.gameBoard}>
        {/* Word display */}
        <div className={styles.wordDisplayContainer}>
          <Stickman wrongGuesses={wrongGuesses} />
          <h2 className={styles.wordDisplayText}>{displayWord}</h2>
        </div>
        {/* Hints */}
        <div className={styles.hintsContainer}>
          <Hints hintsLeft={hintsLeft} maxHints={maxHints} />

          <button
            onClick={useHint}
            disabled={hintsLeft <= 0 || isWinner || isLoser}
            onMouseEnter={() => setHoverHint(true)}
            onMouseLeave={() => setHoverHint(false)}
            className={styles.useHintButton}
          >
            Use Hint
          </button>

          <br />
        </div>
        {/* Wrong guesses info */}
        <p style={{ fontSize: "1rem", color: "#888" }}>
          Wrong guesses: {wrongGuesses} / {maxWrongGuesses}
        </p>

        {/* Keyboard */}
        <Keyboard
          handleGuess={handleGuess}
          isWinner={isWinner}
          isLoser={isLoser}
          guessedLetters={guessedLetters}
          word={word}
        />

        {/* Game result messages */}
        {isWinner && (
          <h3 style={{ color: "green" }}>🎉 Congratulations! You won!</h3>
        )}
        {isLoser && (
          <h3 style={{ color: "red" }}>💀 Game over! The word was: {word}</h3>
        )}

        {/* Reset button */}
        <button
          onClick={resetGame}
          onMouseEnter={() => setHoverReset(true)}
          onMouseLeave={() => setHoverReset(false)}
          className={styles.playAgainButton}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
