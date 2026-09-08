import styles from "../NoteCard/NoteCard.module.css";

const NoteCard = ({ note }) => {
  const {
    title,
    content,
    color,
    background,
    pinned,
    archived,
    createdAt,
    updatedAt,
  } = note;

  return (
    <article
      className={`${styles.note_card} ${
        pinned ? styles.is_pinned : ""
      } ${archived ? styles.is_archived : ""}`}
      style={{
        backgroundColor: color,
        backgroundImage: background ? `url("${background}")` : "none",
      }}
    >
      <div className={styles.note_card_top}>
        <span className={styles.note_card_created}>Created {createdAt}</span>

        {pinned && (
          <span className={styles.note_card_pin} title="Pinned">
            📌
          </span>
        )}
      </div>

      <div className={styles.note_card_body}>
        <h3 className={styles.note_card_title}>{title}</h3>

        <p className={styles.note_card_content}>{content}</p>
      </div>

      <div className={styles.note_card_bottom}>
        <span className={styles.note_card_date}>UpdatedAt {updatedAt}</span>
        <button className={styles.note_card_menu} type="button">
          ⋮
        </button>
      </div>
    </article>
  );
};

export default NoteCard;

//   Search
// Filter
// Sort: newest / oldest
// Grid/List view

// 3 noqte
// Edit
// Pin
// Archive
// Delete
