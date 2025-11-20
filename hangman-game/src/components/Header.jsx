import React from "react";

export default function Header({
  title = "Hangman Game",
  category = "General",
  wrongGuesses = 0,
  maxWrongGuesses = 6,
  openCategoriesOverlay, // button callback
}) {
  return (
    <header
      style={{
        textAlign: "center",
        marginBottom: "20px",
        fontFamily: "sans-serif",
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

      {/* Category info with Custom Categories button */}
      <p
        style={{
          fontSize: "1.2rem",
          color: "#555",
          marginBottom: "5px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        <span>
          Category: <strong>{category}</strong>{" "}
          {openCategoriesOverlay && (
            <button
              onClick={openCategoriesOverlay}
              style={{
                marginLeft: "0.5rem",
                padding: "0.3rem 0.6rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                cursor: "pointer",
                background: "#f5f5f5",
                fontSize: "0.9rem",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#e0e0e0")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#f5f5f5")}
            >
              Choose Category
            </button>
          )}
        </span>
      </p>

      {/* Wrong guesses info */}
      <p style={{ fontSize: "1rem", color: "#888" }}>
        Wrong guesses: {wrongGuesses} / {maxWrongGuesses}
      </p>
    </header>
  );
}
