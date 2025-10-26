function Keyboard({ handleGuess, isLoser, isWinner, guessedLetters }) {
  return (
    <div className="keyboard">
      {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
        <button
          className="letter-key"
          key={letter}
          onClick={() => handleGuess(letter)}
          disabled={guessedLetters.includes(letter) || isWinner || isLoser}
          //   style={{ margin: "2px" }}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default Keyboard;
