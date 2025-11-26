import React, { useEffect, useState } from "react";
import CategoryTile from "./CategoryTile";
import CategoryForm from "./CategoryForm";

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


//   const exportCategory = (category) => {
//     if (!category) return;

//     const dataStr =
//         "data:text/json;charset=utf-8," +
//         encodeURIComponent(JSON.stringify(category, null, 2));
//     const dlAnchorElem = document.createElement("a");
//     dlAnchorElem.setAttribute("href", dataStr);
//     dlAnchorElem.setAttribute("download", `${category.name}.json`);
//     dlAnchorElem.click();
// };

//^ Not working right now, 


  return (
    <div style={overlayStyle}>
      <div style={windowStyle}>
        {!creating && (
          <>
            <h2>Categories</h2>
            <div style={gridStyle}>
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
                  onDelete={() => deleteCategory(cat)}   // only for custom
                />
              ))}



            </div>

            <div style={{marginBottom: "12px"}}>
                <div
                    style={newTileStyle}
                    onClick={() => setCreating(true)}
                    onMouseEnter={(e) => Object.assign(e.currentTarget.style, newTileHover)}
                    onMouseLeave={(e) => Object.assign(e.currentTarget.style, newTileStyle)}
                >
                    + Create New Category
                </div>
            </div>

            <button
              style={buttonStyle}
              onClick={onClose}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHover)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
            >
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

// Styles (same as your previous)
const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  backdropFilter: "blur(3px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 99999,
};
const windowStyle = { background: "white", padding: "2rem", borderRadius: "12px", width: "90%", maxWidth: "480px", boxShadow: "0 8px 28px rgba(0,0,0,0.15)", textAlign: "center" };
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "20px" };
const newTileStyle = { background: "#f5f5f5", padding: "20px", borderRadius: "10px", cursor: "pointer", textAlign: "center", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s, transform 0.15s" };
const newTileHover = { background: "#e0e0e0", transform: "scale(1.03)" };
const buttonStyle = { padding: "0.6rem 1.2rem", borderRadius: "8px", border: "none", background: "#222", color: "white", fontWeight: 500, cursor: "pointer", transition: "background 0.2s" };
const buttonHover = { background: "#000" };
