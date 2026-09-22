import dayjs from "dayjs";
import styles from "../ReminderInfoModal/ReminderInfoModal.module.css";

export default function ReminderInfoModal({
  is_open,
  on_close,
  reminder,
  on_delete,
  on_edit,
}) {
  if (!is_open || !reminder) return null;

  return (
    <div className={styles.overlay} onClick={on_close}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal_icon}>🔔</div>

        <h2 className={styles.modal_title}>{reminder.title}</h2>
        <p className={styles.modal_datetime}>
          {dayjs(reminder.date).format("dddd, DD MMMM YYYY")} • {reminder.time}
        </p>

        {reminder.description && (
          <p className={styles.modal_description}>{reminder.description}</p>
        )}

        <div className={styles.footer_actions}>
          <button
            type="button"
            className={styles.delete_button}
            onClick={() => {
              on_delete(reminder.id);
              on_close();
            }}
          >
            Delete
          </button>
          <button
            type="button"
            className={styles.edit_button}
            onClick={() => on_edit(reminder)}
          >
            Edit
          </button>
          <button
            type="button"
            className={styles.close_button}
            onClick={on_close}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
