import React from "react";

export default function Hints({ hintsLeft, maxHints = 3 }) {
  return (
    <div style={{ textAlign: "center", fontSize: "1.5rem", margin: "10px 0" }}>
      {Array.from({ length: maxHints }, (_, i) => (
        <span
          key={i}
          style={{
            opacity: i < hintsLeft ? 1 : 0.3, // faded if used
            marginRight: "5px",
            transition: "opacity 0.3s",
          }}
        >
          <img src="https://pngimg.com/uploads/smiley/smiley_PNG74.png" 
          style={{height: "40px"}}
            />
        </span>
      ))}
    </div>
  );
}
