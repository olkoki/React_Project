import React, { useEffect, useState } from "react";
import CategoryTile from "../CategoryTile/CategoryTile";
import CategoryForm from "../CategoryForm/CategoryForm";
import styles from "./CategoryOverlay.module.scss";

export default function CategoryOverlay({ onClose, onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(saved);
  }, []);

  const saveCategory = (cat) => {
    let updated;
    if (editingCategory) {
      updated = categories.map((c) => (c.name === cat.name ? cat : c));
    } else {
      updated = [...categories, cat];
    }
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
    setCreating(false);
    setEditingCategory(null);
  };

  const editCategory = (cat) => {
    setEditingCategory(cat);
    setCreating(true);
  };

  const deleteCategory = (cat) => {
    if (!window.confirm(`Delete category "${cat.name}"?`)) return;

    const updated = categories.filter((c) => c.name !== cat.name);
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.window}>
        {!creating && (
          <>
            <h2>Categories</h2>
            <div className={styles.grid}>
              {/* Default / API category */}
              <CategoryTile
                category={{ name: "Movies (default)", words: [] }}
                onSelect={() => onSelectCategory([], null)}
                onEdit={null}
                onDelete={null}
              />

              {/* Custom categories */}
              {categories.map((cat, i) => (
                <CategoryTile
                  key={i}
                  category={cat}
                  onSelect={() => onSelectCategory(cat.words, cat.name)}
                  onEdit={() => editCategory(cat)}
                  onDelete={() => deleteCategory(cat)} // only for custom
                />
              ))}
            </div>

            <div style={{ marginBottom: "12px" }}>
              <div className={styles.newTile} onClick={() => setCreating(true)}>
                + Create New Category
              </div>
            </div>

            <button className={styles.button} onClick={onClose}>
              Close
            </button>
          </>
        )}

        {creating && (
          <CategoryForm
            onSave={saveCategory}
            onCancel={() => {
              setCreating(false);
              setEditingCategory(null);
            }}
            existingCategory={editingCategory}
          />
        )}
      </div>
    </div>
  );
}
