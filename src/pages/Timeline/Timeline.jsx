import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  build_timeline_items,
  group_timeline_by_day,
  format_day_label,
} from "../../utils/buildTimeline";
import TimelineItem from "../../components/TimelineItem/TimelineItem";
import styles from "../Timeline/Timeline.module.css";

const Timeline = () => {
  const notes = useSelector((state) => state.notes.notes);
  const tasks = useSelector((state) => state.tasks.tasks);
  const reminders = useSelector((state) => state.reminders.reminders);

  const grouped_days = useMemo(() => {
    const items = build_timeline_items(notes, tasks, reminders);
    return group_timeline_by_day(items);
  }, [notes, tasks, reminders]);

  let global_index = 0;

  return (
    <div className="page_body">
      <h1 className="body_title">Activity Timeline</h1>
      <p className={styles.page_subtitle}>
        Your chronological history of notes, tasks, and changes.
      </p>

      {grouped_days.length === 0 && (
        <div className={styles.empty_state}>
          <span className={styles.empty_icon}>📜</span>
          <p>No activity yet</p>
        </div>
      )}

      <div className={styles.timeline_center}>
        <div className={styles.center_line} />

        {grouped_days.map(([day_key, items]) => (
          <div key={day_key} className={styles.day_block}>
            <div className={styles.day_badge_row}>
              <span className={styles.day_badge}>
                {format_day_label(day_key)}
              </span>
            </div>

            {items.map((item) => {
              const side = global_index % 2 === 0 ? "left" : "right";
              global_index += 1;
              return <TimelineItem key={item.id} item={item} side={side} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
