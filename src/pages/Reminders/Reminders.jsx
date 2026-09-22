import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar as AntCalendar } from "antd";
import dayjs from "dayjs";
import {
  addReminder,
  updateReminder,
  deleteReminder,
} from "../../redux/features/reminders/remindersSlice";

import { group_reminders_by_date } from "../../utils/reminderGroups";

import ReminderInfoModal from "../../components/ReminderInfoModal/ReminderInfoModal";
import ReminderModal from "../../components/ReminderModal/ReminderModal";
import styles from "../Reminders/Reminders.module.css";

const GROUP_ORDER = ["Today", "Tomorrow", "Upcoming", "Past"];
const get_time_status = (reminder) => {
  const target = dayjs(`${reminder.date} ${reminder.time}`, "YYYY-MM-DD HH:mm");
  const now = dayjs();
  const diff_minutes = target.diff(now, "minute");

  if (diff_minutes < 0) return { label: "Overdue", type: "overdue" };
  if (diff_minutes < 60) return { label: `in ${diff_minutes}m`, type: "soon" };
  if (diff_minutes < 60 * 24)
    return { label: `in ${Math.round(diff_minutes / 60)}h`, type: "today" };
  const diff_days = target.diff(now, "day");
  return { label: `in ${diff_days}d`, type: "future" };
};
const Reminders = () => {
  const dispatch = useDispatch();
  const reminders = useSelector((state) => state.reminders.reminders);

  const [selected_reminder, set_selected_reminder] = useState(null);
  const [info_modal, set_info_modal] = useState(false);
  const [edit_modal, set_edit_modal] = useState(false);
  const [mini_calendar_date, set_mini_calendar_date] = useState(dayjs());

  const groups = group_reminders_by_date(reminders);

  const handle_item_click = (reminder) => {
    set_selected_reminder(reminder);
    set_info_modal(true);
  };

  const handle_close_info = () => {
    set_info_modal(false);
    set_selected_reminder(null);
  };

  const handle_edit_click = (reminder) => {
    set_info_modal(false);
    set_selected_reminder(reminder);
    set_edit_modal(true);
  };

  const handle_close_edit = () => {
    set_edit_modal(false);
    set_selected_reminder(null);
  };

  const handle_save_reminder = (reminder) => {
    dispatch(updateReminder(reminder));
  };

  const handle_delete = (id) => {
    dispatch(deleteReminder(id));
  };

  return (
    <div className="page_body">
      <h1 className="body_title">Reminders</h1>

      <ReminderInfoModal
        is_open={info_modal}
        on_close={handle_close_info}
        reminder={selected_reminder}
        on_delete={handle_delete}
        on_edit={handle_edit_click}
      />

      <ReminderModal
        is_open={edit_modal}
        on_close={handle_close_edit}
        on_save={handle_save_reminder}
        reminder={selected_reminder}
        selected_date={selected_reminder?.date}
      />

      <div className={styles.reminders_layout}>
        <div className={styles.list_column}>
          {GROUP_ORDER.map((group_name) => {
            const group_items = groups[group_name];
            if (!group_items || group_items.length === 0) return null;

            return (
              <div key={group_name} className={styles.group_section}>
                <h3 className={styles.group_label}>
                  {group_name.toUpperCase()}
                </h3>

                <div className={styles.group_items}>
                  {group_items.map((reminder) => {
                    const time_status = get_time_status(reminder);

                    return (
                      <div
                        key={reminder.id}
                        className={styles.reminder_item}
                        onClick={() => handle_item_click(reminder)}
                      >
                        <span className={styles.reminder_bell}>🔔</span>

                        <div className={styles.reminder_body}>
                          <h4 className={styles.reminder_title}>
                            {reminder.title}
                          </h4>
                          <p className={styles.reminder_meta}>
                            {reminder.time} •{" "}
                            {dayjs(reminder.date).format("DD MMM")}
                          </p>
                        </div>

                        <div className={styles.reminder_right}>
                          <span
                            className={`${styles.status_badge} ${styles[`status_${time_status.type}`]}`}
                          >
                            {time_status.label}
                          </span>
                          <span className={styles.reminder_chevron}>›</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {reminders.length === 0 && (
            <div className={styles.empty_state}>
              <span className={styles.empty_icon}>🔔</span>
              <p>No reminders yet</p>
            </div>
          )}
        </div>

        <div className={styles.calendar_column}>
          <AntCalendar
            fullscreen={false}
            value={mini_calendar_date}
            onSelect={(date) => set_mini_calendar_date(date)}
          />
        </div>
      </div>
    </div>
  );
};

export default Reminders;
