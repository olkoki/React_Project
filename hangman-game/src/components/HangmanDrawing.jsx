import React from "react";
import Stickman from "./Stickman/Stickman";

// Later on, when we have actual drawings, we can replace this:
// import stage0 from "../assets/hangman0.png";
// import stage1 from "../assets/hangman1.png";
// ...
// const hangmanStages = [stage0, stage1, ...];

export default function HangmanDrawing({ wrongGuesses, maxWrongGuesses }) {
  // Temporary placeholder stages
  const stages = [
    "😃", // 0 wrong
    "🙂",
    "😐",
    "🙁",
    "😣",
    "😖",
    "💀", // max wrong
  ];
  //Replace the emoji stages with this line when the hangman images are ready
  //<img src={hangmanStages[index]} alt={`Stage ${index}`} />

  // Clamp the value so we don’t go out of range
  const index = Math.min(wrongGuesses, stages.length - 1);

  return (
    // <span
    //   style={{
    //     fontSize: "2rem",
    //   }}
    // >
    //   {stages[index]}
    // </span>
    <Stickman wrongGuesses={wrongGuesses} />
  );
}
