import { useState, useEffect } from "react";
import styles from "../NoteModal/NoteModal.module.css";
const COLORS = [
  "#bb392d",
  "#cc75a5",
  "#aba241",
  "#87b157",
  "#68b0a0",
  "#8bbbc6",
  "#9565bf",
];

const BACKGROUNDS = [
  {
    id: "paper",
    type: "image",
    value:
      "https://images.unsplash.com/photo-1780729996045-46c09e5edda3?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "mountains",
    type: "image",
    value: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=400",
  },
  {
    id: "leaves",
    type: "image",
    value:
      "https://images.unsplash.com/photo-1788238023590-37defb1b9afe?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  {
    id: "ocean",
    type: "image",
    value:
      "https://images.unsplash.com/photo-1775506519644-1ffd90241183?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function NoteModal({ is_open, on_close, on_save, note }) {
  const [title, set_title] = useState("");
  const [content, set_content] = useState("");

  const [selected_color, set_selected_color] = useState("#9ca3af");
  const [selected_background, set_selected_background] = useState(null);

  const [is_palette_open, set_is_palette_open] = useState(false);
  const [active_tab, set_active_tab] = useState("colors");

  useEffect(() => {
    if (is_open) {
      if (note) {
        set_title(note.title || "");
        set_content(note.content || "");
        set_selected_color(note.color || "#9ca3af");
        set_selected_background(note.background || null);
      } else {
        set_title("");
        set_content("");
        set_selected_color("#9ca3af");
        set_selected_background(null);
      }
      set_is_palette_open(false);
      set_active_tab("colors");
    }
  }, [is_open, note]);

  if (!is_open) {
    return null;
  }

  const handle_save = () => {
    const now = new Date().toISOString();
    on_save?.({
      id: note ? note.id : crypto.randomUUID(),
      title: title,
      content: content,
      color: selected_color,
      background: selected_background,
      pinned: note ? note.pinned : false,
      archived: note ? note.archived : false,
      createdAt: note ? note.createdAt : now,
      updatedAt: now,
    });
  };

  const handle_color_select = (color) => {
    set_selected_color(color);
    set_selected_background(null);
  };

  const handle_background_select = (background) => {
    set_selected_background(background.value);
    set_selected_color("transparent");
  };

  return (
    <div className={styles.modal_overlay} onMouseDown={on_close}>
      <div
        className={styles.modal}
        style={{
          backgroundColor: selected_color,
          backgroundImage: selected_background
            ? `url(${selected_background})`
            : "none",
        }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.modal_header}>
          <span className={styles.modal_title}>New note</span>
          <button
            type="button"
            className={styles.close_button}
            onClick={on_close}
            aria-label="Close"
          >
            <span className={"material-symbols-outlined"}>close</span>
          </button>
        </div>

        <div className={styles.modal_body}>
          <input
            type="text"
            value={title}
            onChange={(event) => set_title(event.target.value)}
            placeholder="Title"
            className={styles.title_input}
            autoFocus
          />

          <textarea
            value={content}
            onChange={(event) => set_content(event.target.value)}
            placeholder="Take a note..."
            className={styles.content_input}
          />
        </div>

        <div className={styles.modal_footer}>
          <div className={styles.footer_left}>
            <div className={styles.palette_wrapper}>
              <button
                type="button"
                className={`${styles.tool_button} ${
                  is_palette_open ? styles.tool_button_active : ""
                }`}
                onClick={() => set_is_palette_open((prev) => !prev)}
                aria-label="Customize note"
              >
                <span className={"material-symbols-outlined"}>palette</span>
              </button>

              {is_palette_open && (
                <div className={styles.palette_popover}>
                  <div className={styles.palette_tabs}>
                    <button
                      type="button"
                      className={`${styles.palette_tab} ${
                        active_tab === "colors" ? styles.palette_tab_active : ""
                      }`}
                      onClick={() => set_active_tab("colors")}
                    >
                      <span className={"material-symbols-outlined"}>
                        colors
                      </span>
                    </button>

                    <button
                      type="button"
                      className={`${styles.palette_tab} ${
                        active_tab === "backgrounds"
                          ? styles.palette_tab_active
                          : ""
                      }`}
                      onClick={() => set_active_tab("backgrounds")}
                    >
                      <span className={"material-symbols-outlined"}>
                        landscape_2
                      </span>
                    </button>
                  </div>

                  {active_tab === "colors" && (
                    <div className={styles.color_grid}>
                      {COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={styles.color_option}
                          style={{ backgroundColor: color }}
                          onClick={() => handle_color_select(color)}
                          aria-label={`Select ${color}`}
                        >
                          {selected_color === color && !selected_background && (
                            <span
                              className={`${styles.color_check}, material-symbols-outlined`}
                            >
                              check_small
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}

                  {active_tab === "backgrounds" && (
                    <div className={styles.background_grid}>
                      {BACKGROUNDS.map((background) => (
                        <button
                          key={background.id}
                          type="button"
                          className={`${styles.background_option} ${
                            selected_background === background.value
                              ? styles.background_option_selected
                              : ""
                          }`}
                          style={
                            background.type === "image"
                              ? {
                                  backgroundImage: `url(${background.value})`,
                                }
                              : {
                                  backgroundColor: background.value,
                                }
                          }
                          onClick={() => handle_background_select(background)}
                        >
                          {selected_background === background.value && (
                            <span
                              className={`${styles.background_check}, material-symbols-outlined`}
                            >
                              check_small
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
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
              {note ? "Update note" : "Save note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
