import { useState, useEffect } from "react";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";
import styles from "../TaskModal/TaskModal.module.css";

export default function TaskModal({ is_open, on_close, on_save, task }) {
  const [title, set_title] = useState("");
  const [description, set_description] = useState("");
  const [priority, set_priority] = useState("Medium");
  const [due_date, set_due_date] = useState("");
  const [errors, set_errors] = useState({});
  useEffect(() => {
    if (is_open) {
      if (task) {
        set_title(task.title || "");
        set_description(task.description || "");
        set_priority(task.priority || "Medium");
        set_due_date(task.dueDate || "");
      } else {
        set_title("");
        set_description("");
        set_priority("Medium");
        set_due_date("");
      }
      set_errors({});
    }
  }, [is_open, task]);

  if (!is_open) {
    return null;
  }

  const validate = () => {
    const new_errors = {};
    if (title.trim() === "") {
      new_errors.title = true;
    }
    if (due_date.trim() === "") {
      new_errors.due_date = true;
    }
    set_errors(new_errors);
    return Object.keys(new_errors).length === 0;
  };

  const handle_save = () => {
    if (!validate()) return;
    const now = new Date().toISOString();
    on_save?.({
      id: task ? task.id : crypto.randomUUID(),
      title,
      description,
      priority,
      dueDate: due_date,
      status: task ? task.status : "todo",
      order: task ? task.order : undefined,
      createdAt: task ? task.createdAt : now,
      updatedAt: now,
    });

    on_close?.();
  };

  const handle_priority_change = (value) => {
    set_priority(value);
  };
  const handle_title_change = (e) => {
    set_title(e.target.value);
    if (e.target.value.trim() !== "") {
      set_errors((prev) => {
        const updated = { ...prev };
        delete updated.title;
        return updated;
      });
    }
  };

  const handle_date_change = (date) => {
    set_due_date(date ? date.format("YYYY-MM-DD") : "");
    if (date) {
      set_errors((prev) => {
        const updated = { ...prev };
        delete updated.due_date;
        return updated;
      });
    }
  };

  return (
    <div className={styles.overlay} onClick={on_close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modal_title}>
          {task ? "Edit Task" : "New Task"}
        </h2>

        <input
          className={`${styles.input_field} ${errors.title ? styles.input_error : ""}`}
          type="text"
          placeholder="Task title"
          value={title}
          onChange={handle_title_change}
        />
        <textarea
          className={styles.textarea_field}
          placeholder="Description"
          rows={4}
          value={description}
          onChange={(e) => set_description(e.target.value)}
        />

        <div className={styles.field_row}>
          <div className={styles.field_group}>
            <label className={styles.field_label}>Priority</label>

            <Select
              className={styles.priority_select}
              value={priority}
              onChange={handle_priority_change}
              options={[
                { value: "High", label: "High" },
                { value: "Medium", label: "Medium" },
                { value: "Low", label: "Low" },
              ]}
            />
          </div>

          <div className={styles.field_group}>
            <label className={styles.field_label}>Due date</label>
            <DatePicker
              className={`${styles.due_date_picker} ${errors.due_date ? styles.input_error : ""}`}
              value={due_date ? dayjs(due_date) : null}
              onChange={handle_date_change}
              format="DD.MM.YYYY"
            />
          </div>
        </div>

        <div className={styles.footer_actions}>
          <button
            type="button"
            className={styles.cancel_button}
            onClick={on_close}
          >
            Cancel
          </button>
          <button
            type="button"
            className={styles.save_button}
            onClick={handle_save}
          >
            {task ? "Update task" : "Save task"}
          </button>
        </div>
      </div>
    </div>
  );
}
