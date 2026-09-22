import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar as AntCalendar } from "antd";
import dayjs from "dayjs";
import { addReminder, updateReminder, deleteReminder } from "../../redux/features/reminders/remindersSlice";
import AgendaPanel from "../../components/AgendaPanel/AgendaPanel";
import ReminderModal from "../../components/ReminderModal/ReminderModal";
import styles from "../Calendar/Calendar.module.css";

const REMINDER_COLORS = ["#6366f1", "#f59e0b", "#22c55e", "#ec4899", "#0ea5e9"];

const get_reminder_color = (id) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return REMINDER_COLORS[Math.abs(hash) % REMINDER_COLORS.length];
};

const Calendar = () => {
  const dispatch = useDispatch();
  const reminders = useSelector((state) => state.reminders.reminders);

  const [selected_date, set_selected_date] = useState(dayjs().format("YYYY-MM-DD"));
  const [reminder_modal, set_reminder_modal] = useState(false);
  const [editing_reminder, set_editing_reminder] = useState(null);

  const handle_date_select = (date) => {
    set_selected_date(date.format("YYYY-MM-DD"));
  };

  const handle_add_click = () => {
    set_editing_reminder(null);
    set_reminder_modal(true);
  };

  const handle_card_click = (reminder) => {
    set_editing_reminder(reminder);
    set_reminder_modal(true);
  };

  const handle_close_modal = () => {
    set_reminder_modal(false);
    set_editing_reminder(null);
  };

  const handle_save_reminder = (reminder) => {
    if (editing_reminder) {
      dispatch(updateReminder(reminder));
    } else {
      dispatch(addReminder(reminder));
    }
  };

  const handle_delete_reminder = (id) => {
    dispatch(deleteReminder(id));
  };

  // v5-in yeni API-si: dateCellRender əvəzinə cellRender, info.type yoxlanılmalıdır
  const cell_render = (date, info) => {
    if (info.type !== "date") {
      return info.originNode;
    }

    const date_string = date.format("YYYY-MM-DD");
    const day_reminders = reminders.filter((r) => r.date === date_string);

    if (day_reminders.length === 0) return null;

    return (
      <div className={styles.cell_dots}>
        {day_reminders.slice(0, 3).map((r) => (
          <span key={r.id} className={styles.cell_dot} style={{ backgroundColor: get_reminder_color(r.id) }} />
        ))}
      </div>
    );
  };

  return (
    <div className="page_body">
      <h1 className="body_title">Calendar</h1>

      <ReminderModal
        is_open={reminder_modal}
        on_close={handle_close_modal}
        on_save={handle_save_reminder}
        reminder={editing_reminder}
        selected_date={selected_date}
      />

      <div className={styles.calendar_layout}>
        <div className={styles.calendar_card}>
          <AntCalendar
            fullscreen={true}
            value={dayjs(selected_date)}
            onSelect={handle_date_select}
            cellRender={cell_render}
          />
        </div>

        <div className={styles.agenda_wrap}>
          <AgendaPanel
            selected_date={selected_date}
            reminders={reminders}
            on_add_click={handle_add_click}
            on_card_click={handle_card_click}
            on_delete={handle_delete_reminder}
            get_color={get_reminder_color}
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;