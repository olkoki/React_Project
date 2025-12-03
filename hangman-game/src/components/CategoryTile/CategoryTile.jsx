import styles from "./CategoryTile.module.scss";

export default function CategoryTile({ category, onSelect, onEdit, onDelete }) {
  return (
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
