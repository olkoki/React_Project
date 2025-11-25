export default function CategoryTile({ category, onSelect, onEdit }) {
  return (
    <div
      style={{
        background: "#f5f5f5",
        borderRadius: "8px",
        padding: "1rem",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span onClick={onSelect}>{category.name}</span>
      <button onClick={onEdit} style={{ border: "none", background: "transparent", cursor: "pointer" }}>✎</button>
    </div>
  );
}
