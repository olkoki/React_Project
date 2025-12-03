import React from "react";
import styles from "./Header.module.scss";

export default function Header({
  title = "Hangman Game",
  category = "General",
  wrongGuesses = 0,
  maxWrongGuesses = 6,
  openCategoriesOverlay, // button callback
}) {
  return (
    <header className={styles.header}>
      {/* Main game title */}
      <h1 className={styles.title}>{title}</h1>

      {/* Category info with Custom Categories button */}
      <p className={styles.categoryInfo}>
        <span>
          Category: <strong>{category}</strong>
          {openCategoriesOverlay && (
            <button
              className={styles.categoryButton}
              onClick={openCategoriesOverlay}
            >
              Choose Category
            </button>
          )}
        </span>
      </p>

      {/* Wrong guesses info 
      <p style={{ fontSize: "1rem", color: "#888" }}>
        Wrong guesses: {wrongGuesses} / {maxWrongGuesses}
      </p>*/}
    </header>
  );
}
