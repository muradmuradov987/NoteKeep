import { useState, useRef, useEffect, memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatDate } from "../../utils/utils.js";
import styles from "../NoteCard/NoteCard.module.css";
const NoteCard = ({
  note,
  onClick,
  onTogglePin,
  onToggleArchive,
  onDelete,
}) => {
  const {
    id,
    title,
    content,
    color,
    background,
    pinned,
    archived,
    createdAt,
    updatedAt,
  } = note;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const drag_style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : "auto",
  };

  const [menu_open, set_menu_open] = useState(false);
  const menu_ref = useRef(null);

  useEffect(() => {
    const handle_click_outside = (e) => {
      if (menu_ref.current && !menu_ref.current.contains(e.target)) {
        set_menu_open(false);
      }
    };
    document.addEventListener("mousedown", handle_click_outside);
    return () =>
      document.removeEventListener("mousedown", handle_click_outside);
  }, []);

  const handle_menu_toggle = (e) => {
    e.stopPropagation();
    set_menu_open((prev) => !prev);
  };

  const handle_action = (e, action) => {
    e.stopPropagation();
    action?.();
    set_menu_open(false);
  };
  return (
    <article
      ref={setNodeRef}
      style={{
        ...drag_style,
        backgroundColor: color,
        backgroundImage: background ? `url("${background}")` : "none",
      }}
      className={`${styles.note_card} ${
        pinned ? styles.is_pinned : ""
      } ${archived ? styles.is_archived : ""}`}
      onClick={onClick}
    >
      <div
        className={styles.note_card_drag_handle}
        {...attributes}
        {...listeners}
        onClick={(e) => e.stopPropagation()}
        title="Drag to reorder"
      >
        ⠿
      </div>

      <div className={styles.note_card_top}>
        <span className={styles.note_card_created}>
          Created {formatDate(createdAt)}
        </span>

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
        <span className={styles.note_card_date}>
          UpdatedAt {formatDate(updatedAt)}
        </span>

        <div className={styles.note_card_menu_wrap} ref={menu_ref}>
          <button
            className={styles.note_card_menu}
            type="button"
            onClick={handle_menu_toggle}
            aria-label="Note options"
          >
            ⋮
          </button>

          {menu_open && (
            <div className={styles.note_card_popover} role="menu">
              {onTogglePin && (
                <button
                  type="button"
                  className={styles.popover_item}
                  onClick={(e) => handle_action(e, onTogglePin)}
                >
                  <span className={styles.popover_icon}>📌</span>
                  {pinned ? "Unpin" : "Pin"}
                </button>
              )}
              {onToggleArchive && (
                <button
                  type="button"
                  className={styles.popover_item}
                  onClick={(e) => handle_action(e, onToggleArchive)}
                >
                  <span
                    className={`${styles.popover_icon} material-symbols-outlined`}
                  >
                    archive
                  </span>

                  {archived ? "Unarchive" : "Archive"}
                </button>
              )}

              <div className={styles.popover_divider} />

              <button
                type="button"
                className={`${styles.popover_item} ${styles.popover_item_danger}`}
                onClick={(e) => handle_action(e, onDelete)}
              >
                <span
                  className={`${styles.popover_icon} material-symbols-outlined`}
                >
                  delete
                </span>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default memo(NoteCard);
