import React, { useState, useEffect } from "react";

export default function Hints({ hintsLeft, maxHints = 3 }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive sizes
  const containerFontSize = isMobile ? "0.8rem" : "1rem";
  const iconFontSize = isMobile ? "1.5rem" : "2.5rem";
  const iconMarginRight = isMobile ? "3px" : "5px";

  return (
    <div
      style={{
        textAlign: "center",
        fontSize: containerFontSize,
        margin: "10px 0",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {Array.from({ length: maxHints }, (_, i) => (
        <span
          key={i}
          style={{
            opacity: i < hintsLeft ? 1 : 0.3, // faded if used
            marginRight: iconMarginRight,
            transition: "opacity 0.3s",
          }}
        >
          <div style={{ fontSize: iconFontSize }}>㋡</div>
        </span>
      ))}
    </div>
  );
}
