import dayjs from "dayjs";
import styles from "../AgendaPanel/AgendaPanel.module.css";

const AgendaPanel = ({ selected_date, reminders, on_add_click, on_card_click, on_delete, get_color }) => {
  const day_reminders = reminders
    .filter((r) => r.date === selected_date)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className={styles.agenda_panel}>
      <div className={styles.agenda_header}>
        <div>
          <h3 className={styles.agenda_title}>Agenda</h3>
          <span className={styles.agenda_date}>{dayjs(selected_date).format("dddd, DD MMMM")}</span>
        </div>
        <button type="button" className={styles.add_button} onClick={on_add_click}>
          <span className={styles.add_icon}>+</span> Add
        </button>
      </div>

      <div className={styles.agenda_list}>
        {day_reminders.length === 0 && (
          <div className={styles.agenda_empty}>
            <span className={styles.agenda_empty_icon}>🗓</span>
            <p>No reminders for this day</p>
          </div>
        )}

        {day_reminders.map((reminder) => {
          const color = get_color(reminder.id);
          return (
            <div
              key={reminder.id}
              className={styles.agenda_item}
              style={{ borderLeftColor: color }}
              onClick={() => on_card_click(reminder)}
            >
              <div className={styles.agenda_item_time_badge} style={{ backgroundColor: `${color}1a`, color }}>
                {reminder.time}
              </div>

              <div className={styles.agenda_item_body}>
                <h4 className={styles.agenda_item_title}>{reminder.title}</h4>
                {reminder.description && (
                  <p className={styles.agenda_item_description}>{reminder.description}</p>
                )}
              </div>

              <button
                type="button"
                className={styles.agenda_item_delete}
                onClick={(e) => {
                  e.stopPropagation();
                  on_delete(reminder.id);
                }}
                aria-label="Delete reminder"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AgendaPanel;