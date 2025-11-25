import React from "react";
import Keyboard from "./Keyboard";
import HangmanDrawing from "./HangmanDrawing";
import Header from "./Header";
import Hints from "./Hints";

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
}) {
  return (
    <div style={{textAlign: "center", marginTop: "40px"}}>
      <Header 
        playerName="Log In" //placeholder
        category="Programming" //placeholder
        wrongGuesses={wrongGuesses}
        maxWrongGuesses={maxWrongGuesses}
      />
        <div className="game-board" style={{ textAlign: "center", marginTop: "40px" }}>
        {/*<h1>Hangman Game</h1>*/}

        {/* Word display */}
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                gap: "2rem",
            }}>
            <HangmanDrawing wrongGuesses={wrongGuesses} maxWrongGuesses={maxWrongGuesses} />
            <h2 style={{ letterSpacing: "0.5px", fontFamily: "monospace" }}>{displayWord}</h2>
        </div>
        {/* Hints */}
        <div style={{ 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "20px" 
            }}>
            <Hints hintsLeft={hintsLeft} maxHints={maxHints} />

            <button
                onClick={useHint}
                disabled={hintsLeft <= 0 || isWinner || isLoser}
                style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    cursor: hintsLeft <= 0 ? "not-allowed" : "pointer",
                }}
            >
                Use Hint
            </button>
            <br />
            {/* Wrong guesses info */}
      <p style={{ fontSize: "1rem", color: "#888" }}>
        Wrong guesses: {wrongGuesses} / {maxWrongGuesses}
      </p>
        </div>

        {/* Keyboard */}
        <Keyboard
            handleGuess={handleGuess}
            isWinner={isWinner}
            isLoser={isLoser}
            guessedLetters={guessedLetters}
            word={word}
        />

        {/* Game result messages */}
        {isWinner && <h3 style={{ color: "green" }}>🎉 Congratulations! You won!</h3>}
        {isLoser && <h3 style={{ color: "red" }}>💀 Game over! The word was: {word}</h3>}

        {/* Reset button */}
        <button
            onClick={resetGame}
            style={{
            width: "300px",  
            height: "80px",
            fontSize: "large",
            marginTop: "20px",
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "	#77dd77",
            color: "white",
            border: "none",
            cursor: "pointer",
            }}
        >
            Play Again
        </button>
        </div>
    </div>
  );
}
