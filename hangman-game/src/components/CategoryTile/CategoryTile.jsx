import styles from "./CategoryTile.module.scss";

export default function CategoryTile({ category, onSelect, onEdit, onDelete }) {
  return (
    // moved on click select to the div so that it is entirely clickable, instead of the span
    <div className={styles.container} onClick={onSelect}>
      <span>{category.name}</span>

      <div className={styles.buttonContainer}>
        {onEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className={styles.editButton}
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
            className={styles.deleteButton}
          >
            🗑
          </button>
        )}
      </div>
    </div>
  );
}
