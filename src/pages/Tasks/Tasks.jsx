import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import {
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  reorderColumn,
} from "../../redux/features/tasks/tasksSlice";

import TaskColumn from "../../components/TaskColumn/TaskColumn";
import TaskCard from "../../components/TaskCard/TaskCard";
import TaskModal from "../../components/TaskModal/TaskModal";
import styles from "../Tasks/Tasks.module.css";

const COLUMNS = [
  { status: "todo", title: "To Do", dot_color: "#ff0000" },
  { status: "inprogress", title: "In Progress", dot_color: "#3e41f8" },
  { status: "done", title: "Done", dot_color: "#0bdf59" },
];

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const [task_modal, set_task_modal] = useState(false);
  const [editing_task, set_editing_task] = useState(null);
  const [active_id, set_active_id] = useState(null);
  const [source_container, set_source_container] = useState(null);
  const [columns_state, set_columns_state] = useState({});

  useEffect(() => {
    const grouped = {};
    COLUMNS.forEach((col) => {
      grouped[col.status] = tasks
        .filter((t) => t.status === col.status)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((t) => t.id);
    });
    set_columns_state(grouped);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  );

  const find_container = (id) => {
    if (columns_state[id]) return id;
    return Object.keys(columns_state).find((status) =>
      columns_state[status]?.includes(id),
    );
  };

  const handle_drag_start = (event) => {
    set_active_id(event.active.id);
    set_source_container(find_container(event.active.id));
  };

  const handle_drag_over = (event) => {
    const { active, over } = event;
    if (!over) return;

    const active_container = find_container(active.id);
    const over_container = find_container(over.id) || over.id;

    if (
      !active_container ||
      !over_container ||
      active_container === over_container
    )
      return;

    set_columns_state((prev) => {
      const active_items = [...prev[active_container]];
      const over_items = [...prev[over_container]];

      const active_index = active_items.indexOf(active.id);
      const over_index = over_items.indexOf(over.id);

      active_items.splice(active_index, 1);
      const insert_at = over_index >= 0 ? over_index : over_items.length;
      over_items.splice(insert_at, 0, active.id);

      return {
        ...prev,
        [active_container]: active_items,
        [over_container]: over_items,
      };
    });
  };

  const handle_drag_end = (event) => {
    const { active, over } = event;
    const started_container = source_container;
    set_active_id(null);
    set_source_container(null);

    if (!over) return;

    const over_container = find_container(over.id) || over.id;
    if (!over_container) return;

    let final_items = columns_state[over_container];

    if (started_container === over_container) {
      const old_index = final_items.indexOf(active.id);
      const new_index = final_items.indexOf(over.id);
      if (old_index !== -1 && new_index !== -1 && old_index !== new_index) {
        final_items = arrayMove(final_items, old_index, new_index);
      }
    } else {
      dispatch(moveTask({ id: active.id, status: over_container }));
      dispatch(
        reorderColumn({
          status: started_container,
          orderedIds: columns_state[started_container],
        }),
      );
    }

    dispatch(
      reorderColumn({ status: over_container, orderedIds: final_items }),
    );
  };

  const handle_save_task = (task) => {
    if (editing_task) {
      dispatch(updateTask(task));
    } else {
      const todo_tasks = tasks.filter((t) => t.status === "todo");
      const next_order = todo_tasks.length
        ? Math.max(...todo_tasks.map((t) => t.order ?? 0)) + 1
        : 0;
      dispatch(addTask({ ...task, order: next_order }));
    }
  };

  const handle_close_modal = () => {
    set_task_modal(false);
    set_editing_task(null);
  };

  const handle_card_click = (task) => {
    set_editing_task(task);
    set_task_modal(true);
  };

  const handle_delete_task = (id) => dispatch(deleteTask(id));

  const active_task = tasks.find((t) => t.id === active_id);

  const get_column_tasks = (status) =>
    (columns_state[status] || [])
      .map((id) => tasks.find((t) => t.id === id))
      .filter(Boolean);

  return (
    <div className="page_body">
      <h1 className="body_title">Tasks</h1>

      <TaskModal
        is_open={task_modal}
        on_close={handle_close_modal}
        on_save={handle_save_task}
        task={editing_task}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handle_drag_start}
        onDragOver={handle_drag_over}
        onDragEnd={handle_drag_end}
      >
        <div className={styles.board}>
          {COLUMNS.map((col) => (
            <TaskColumn
              key={col.status}
              column={col}
              tasks={get_column_tasks(col.status)}
              on_add_task={
                col.status === "todo" ? () => set_task_modal(true) : null
              }
              on_card_click={handle_card_click}
              on_delete_task={handle_delete_task}
            />
          ))}
        </div>

        <DragOverlay>
          {active_task ? <TaskCard task={active_task} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Tasks;
