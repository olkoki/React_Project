import React, { useState } from "react";
import styles from "./CategoryForm.module.scss";

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
    <div className={styles.container}>
      <h3 className={styles.title}>
        {existingCategory ? "Edit Category" : "New Category"}
      </h3>

      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.categoryInput}
      />
      <div className={styles.inputRow}>
        <input
          type="text"
          placeholder="Add word"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addWord()}
          className={styles.wordInput}
        />
        <button onClick={addWord} className={styles.addButton}>
          Add
        </button>
      </div>
      <div className={styles.wordsContainer}>
        {words.map((word, i) => (
          <div key={i} className={styles.wordTag}>
            <span>{word}</span>
            <button
              onClick={() => removeWord(word)}
              className={styles.removeWordButton}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleSave} className={styles.saveButton}>
          Save
        </button>
        <button onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
}
