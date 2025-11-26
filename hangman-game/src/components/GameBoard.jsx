import React, { useState } from "react";
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
  openCategoriesOverlay,
  selectedCategoryName,
}) {
  const [hoverReset, setHoverReset] = useState(false)
  const [hoverHint, setHoverHint] = useState(false)
  return (
    <div style={{textAlign: "center", marginTop: "40px"}}>
      <Header 

        playerName="Alice" //placeholder
        category={selectedCategoryName || "Movies"}
        openCategoriesOverlay={openCategoriesOverlay}
        wrongGuesses={wrongGuesses}
        maxWrongGuesses={maxWrongGuesses}
      />
        <div className="game-board" style={{ textAlign: "center", marginTop: "40px"}}>

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
              onMouseEnter={() => setHoverHint(true)}
              onMouseLeave={() => setHoverHint(false)}
              style={{
                width: "100px",
                height: "50px",
                fontSize: "1rem",
                padding: "4px 10px",
                borderRadius: "30px",                     
                backgroundColor: hoverHint ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.05)", 
                color: hoverHint ? "#000" : "#111",
                border: "2px solid rgba(0,0,0,0.6)",                
                cursor: hintsLeft <= 0 ? "not-allowed" : "pointer",
                fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
                transition: "all 0.2s ease-in-out",
                boxShadow: hoverHint ? "2px 2px 0px #000" : "1px 1px 0px #333",
                transform: hoverHint ? "scale(1.05) rotate(-1deg)" : "scale(1) rotate(0deg)",
                opacity: hintsLeft <= 0 ? 0.5 : 1,        // dim if disabled
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
          onMouseEnter={() => setHoverReset(true)}
          onMouseLeave={() => setHoverReset(false)}
          style={{
            width: "220px",         
            height: "60px",
            fontSize: "1.2rem",
            marginTop: "30px",
            padding: "10px 20px",
            borderRadius: "30px",      
            backgroundColor: hoverReset ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.05)",
            color: hoverReset ? "#000" : "#111",
            border: "3px solid #000",
            cursor: "pointer",
            fontFamily: "'Comic Sans MS', 'Comic Neue', cursive",
            transition: "all 0.2s ease-in-out",
            boxShadow: hoverReset ? "2px 2px 0px #000" : "1px 1px 0px #333",
            transform: hoverReset ? "scale(1.05) rotate(-1deg)" : "scale(1) rotate(0deg)",
          }}
        >
          Play Again
        </button>



        </div>
    </div>
  );
}
