import dayjs from "dayjs";
import styles from "../TimelineItem/TimelineItem.module.css";

const TYPE_LABELS = {
  note: "Note Created",
  task: "Task Updated",
  reminder: "Reminder Added",
};

const TimelineItem = ({ item, side }) => {
  return (
    <div className={`${styles.row} ${side === "right" ? styles.row_right : styles.row_left}`}>
      <div className={styles.card_col}>
        <div className={styles.card} style={{ borderLeftColor: item.color }}>
          <div className={styles.card_header}>
            <span className={styles.card_icon}>{item.icon}</span>
            <span className={styles.card_label} style={{ color: item.color }}>
              {TYPE_LABELS[item.type]}
            </span>
          </div>

          <h4 className={styles.card_title}>{item.title}</h4>
          {item.subtitle && <p className={styles.card_subtitle}>{item.subtitle}</p>}

          <span className={styles.card_time}>{dayjs(item.timestamp).format("HH:mm")}</span>
        </div>
      </div>

      <div className={styles.dot_col}>
        <span className={styles.dot} style={{ backgroundColor: item.color }} />
      </div>

      <div className={styles.spacer_col} />
    </div>
  );
};

export default TimelineItem;