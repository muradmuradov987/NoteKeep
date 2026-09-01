import { useNavigate } from "react-router";
import styles from "../RecentNotesCard/RecentNotesCard.module.css";

const notes = [
  {
    id: 1,
    title: "Meeting Notes: Project Alpha",
    updated_at: "Updated 2 hours ago",
    icon: "edit_document",
    icon_class: "purple",
  },
  {
    id: 2,
    title: "Brainstorming: New Features",
    updated_at: "Updated yesterday",
    icon: "lightbulb",
    icon_class: "orange",
  },
  {
    id: 3,
    title: "Weekly Review Draft",
    updated_at: "Updated Oct 20",
    icon: "article",
    icon_class: "blue",
  },
];
const RecentNotesCard = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.recent_notes}>
      <div className={styles.notes_header}>
        <h2 className={styles.notes_title}>Recent Notes</h2>

        <button className={styles.view_all} onClick={() => navigate("/notes")}>
          View All
        </button>
      </div>

      <div className={styles.notes_list}>
        {notes.slice(-3).map((note) => (
          <div className={styles.note_item} key={note.id}>
            <div className={`${styles.note_icon} ${styles[note.icon_class]}`}>
              <span className="material-symbols-outlined">{note.icon}</span>
            </div>
            <div className={styles.note_content}>
              <h3 className={styles.note_title}>{note.title}</h3>
              <p className={styles.note_updated}>{note.updated_at}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentNotesCard;
