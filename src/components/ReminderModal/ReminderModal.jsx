import { useState, useEffect } from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import styles from "../ReminderModal/ReminderModal.module.css";


export default function ReminderModal({
  is_open,
  on_close,
  on_save,
  reminder,
  selected_date,
}) {
  const [title, set_title] = useState("");
  const [description, set_description] = useState("");
  const [time, set_time] = useState("");
  const [errors, set_errors] = useState({});

  useEffect(() => {
    if (is_open) {
      if (reminder) {
        set_title(reminder.title || "");
        set_description(reminder.description || "");
        set_time(reminder.time || "");
      } else {
        set_title("");
        set_description("");
        set_time("");
      }
      set_errors({});
    }
  }, [is_open, reminder]);

  if (!is_open) {
    return null;
  }

  const validate = () => {
    const new_errors = {};
    if (title.trim() === "") new_errors.title = true;
    if (time.trim() === "") new_errors.time = true;
    set_errors(new_errors);
    return Object.keys(new_errors).length === 0;
  };

  const handle_save = () => {
    if (!validate()) return;

    on_save?.({
      id: reminder ? reminder.id : crypto.randomUUID(),
      title,
      description,
      date: reminder ? reminder.date : selected_date,
      time,
      createdAt: reminder ? reminder.createdAt : new Date().toISOString(),
    });

    on_close?.();
  };

  const handle_time_change = (time_obj) => {
    set_time(time_obj ? time_obj.format("HH:mm") : "");
    if (time_obj) {
      set_errors((prev) => {
        const updated = { ...prev };
        delete updated.time;
        return updated;
      });
    }
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

  return (
    <div className={styles.overlay} onClick={on_close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modal_title}>
          {reminder ? "Edit Reminder" : "New Reminder"}
        </h2>
        <p className={styles.modal_date_label}>
          {dayjs(reminder ? reminder.date : selected_date).format(
            "DD MMM YYYY",
          )}
        </p>

        <input
          className={`${styles.input_field} ${errors.title ? styles.input_error : ""}`}
          type="text"
          placeholder="Reminder title"
          value={title}
          onChange={handle_title_change}
        />

        <textarea
          className={styles.textarea_field}
          placeholder="Description (optional)"
          rows={3}
          value={description}
          onChange={(e) => set_description(e.target.value)}
        />

        <div className={styles.field_group}>
          <label className={styles.field_label}>Time</label>
          <TimePicker
            className={`${styles.time_picker} ${errors.time ? styles.input_error : ""}`}
            value={time ? dayjs(time, "HH:mm") : null}
            onChange={handle_time_change}
            format="HH:mm"
            minuteStep={5}
          />
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
            {reminder ? "Update reminder" : "Save reminder"}
          </button>
        </div>
      </div>
    </div>
  );
}
