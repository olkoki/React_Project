export default function CategoryTile({ category, onSelect, onEdit, onDelete }) {
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

      <div style={{ display: "flex", gap: "8px" }}>
        {onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
            }}
          >
            ✎
          </button>
        )}

        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "red",
              fontWeight: "bold",
            }}
          >
            🗑
          </button>
        )}
      </div>
    </div>
  );
}
