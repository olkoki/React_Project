
import React from "react";

export default function Header({ 
    title = "Hangman Game", 
    playerName = "Player",
    category = "General",
    wrongGuesses = 0,
    maxWrongGuesses = 6,
}) {
  return (
    <header
      style={{
        textAlign: "center",
        marginBottom: "20px",
      }}
    >
      {/* Main game title */}
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        {title}
      </h1>

      {/* Player info and category */}
      <p
        style={{
          fontSize: "1.2rem",
          color: "#555",
          marginBottom: "5px",
        }}
      >
        Player: <strong>{playerName}</strong> | Category: <strong>{category}</strong>
      </p>

      {/* Wrong guesses info 
      <p style={{ fontSize: "1rem", color: "#888" }}>
        Wrong guesses: {wrongGuesses} / {maxWrongGuesses}
      </p>*/}
    </header>
  );
}