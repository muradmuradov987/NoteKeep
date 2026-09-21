import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "../TaskCard/TaskCard";
import styles from "../TaskColumn/TaskColumn.module.css";

const TaskColumn = ({
  column,
  tasks,
  on_add_task,
  on_card_click,
  on_delete_task,
}) => {
  const { setNodeRef } = useDroppable({ id: column.status });

  return (
    <div className={styles.column}>
      <div className={styles.column_header}>
        <div className={styles.column_title_group}>
          <span
            className={styles.column_dot}
            style={{ backgroundColor: column.dot_color }}
          />
          <h2 className={styles.column_title}>{column.title}</h2>
          <span className={styles.column_count}>{tasks.length}</span>
        </div>

        {on_add_task && (
          <button
            type="button"
            className={styles.column_add_button}
            onClick={on_add_task}
          >
            + Add Task
          </button>
        )}
      </div>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className={styles.column_body}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={() => on_card_click(task)}
              onDelete={() => on_delete_task(task.id)}
            />
          ))}

          {tasks.length === 0 && (
            <div className={styles.column_empty}>Drag tasks here</div>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default TaskColumn;
