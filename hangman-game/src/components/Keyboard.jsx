function Keyboard({
  keyboardStyle,
  handleGuess,
  isLoser,
  isWinner,
  guessedLetters,
  word,
}) {
  return (
    <div className="keyboard">
      {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
        <button
          id={keyboardStyle}
          className="letter-key"
          key={letter}
          onClick={() => handleGuess(letter)}
          disabled={guessedLetters.includes(letter) || isWinner || isLoser}
          style={{
            color:
              guessedLetters.includes(letter) &&
              word.toUpperCase().includes(letter)
                ? "green"
                : !guessedLetters.includes(letter)
                ? "black"
                : "red",
          }}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default Keyboard;
