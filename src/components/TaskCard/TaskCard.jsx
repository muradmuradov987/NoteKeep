import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "../TaskCard/TaskCard.module.css";

const priority_class_map = {
  High: "priority_high",
  Medium: "priority_medium",
  Low: "priority_low",
};


const format_due_date = (date_string) => {
  if (!date_string) return "";
  const date = new Date(date_string);
  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const TaskCard = ({ task, onClick, onDelete }) => {
  const { id, title, description, priority, dueDate } = task;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const drag_style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const priority_class = priority_class_map[priority] || "priority_medium";

  return (
    <div
      ref={setNodeRef}
      style={drag_style}
      className={styles.task_card}
      onClick={onClick}
    >
      <div className={styles.task_card_top}>
        <span className={`${styles.priority_badge} ${styles[priority_class]}`}>
          {priority}
        </span>

        <div
          className={styles.task_card_drag_handle}
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
          title="Drag to move"
        >
          ⠿
        </div>
      </div>

      <h4 className={styles.task_card_title}>{title}</h4>

      {description && (
        <p className={styles.task_card_description}>{description}</p>
      )}

      <div className={styles.task_card_bottom}>
        {dueDate && (
          <span className={styles.task_card_due}>
            📅 {format_due_date(dueDate)}
          </span>
        )}

        <button
          type="button"
          className={styles.task_card_delete}
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          aria-label="Delete task"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
