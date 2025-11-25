import React, { useState } from "react";

export default function CategoryForm({ onSave, onCancel, existingCategory }) {
  const [name, setName] = useState(existingCategory?.name || "");
  const [words, setWords] = useState(existingCategory?.words || []);
  const [input, setInput] = useState("");

  const addWord = () => {
    const trimmed = input.trim().toUpperCase();
    // Only allow letters A-Z
    if (!/^[A-Z]+$/.test(trimmed)) {
      alert("Words can only contain letters A-Z.");
      setInput("");
      return;
    }

    if (trimmed && !words.includes(trimmed)) {
      setWords([...words, trimmed]);
    }
    setInput("");
  };

  const removeWord = (wordToRemove) => {
    setWords(words.filter((w) => w !== wordToRemove));
  };

  const handleSave = () => {
    if (!name || words.length === 0) return;
    onSave({ name, words });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3>{existingCategory ? "Edit Category" : "New Category"}</h3>

      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "0.5rem", marginBottom: "1rem", width: "80%" }}
      />
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          marginBottom: "0.75rem",
        }}
      >
        <input
          type="text"
          placeholder="Add word"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addWord()}
          style={{ padding: "0.5rem", width: "60%" }}
        />
        <button
          onClick={addWord}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "1.5rem",
        }}
      >
        {words.map((word, i) => (
          <div
            key={i}
            style={{
              background: "#eee",
              padding: "0.3rem 0.6rem",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              fontSize: "0.85rem",
            }}
          >
            <span>{word}</span>
            <button
              onClick={() => removeWord(word)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#888",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <button
          onClick={handleSave}
          style={{
            padding: "0.5rem 1rem",
            background: "#222",
            color: "white",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Save
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
