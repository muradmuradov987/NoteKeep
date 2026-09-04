import { useState } from "react";
// import { X, Palette, Check, Image as ImageIcon } from "lucide-react";

import styles from "../NoteModal/NoteModal.module.css";

const COLORS = [
  "#fef3c7",
  "#dcfce7",
  "#dbeafe",
  "#fce7f3",
  "#ede9fe",
  "#ffedd5",
  "#f3f4f6",
];

const BACKGROUNDS = [
  {
    id: "paper",
    type: "image",
    value: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400",
  },
  {
    id: "leaves",
    type: "image",
    value: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=400",
  },
  {
    id: "mountains",
    type: "image",
    value: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=400",
  },
  {
    id: "ocean",
    type: "image",
    value: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
  },
];

export default function NoteModal({ is_open, on_close, on_save }) {
  const [title, set_title] = useState("");
  const [content, set_content] = useState("");

  const [selected_color, set_selected_color] = useState("var(--bg-surface-card)");
  const [selected_background, set_selected_background] = useState(null);

  const [is_palette_open, set_is_palette_open] = useState(false);
  const [active_tab, set_active_tab] = useState("colors");

  if (!is_open) {
    return null;
  }

  const handle_save = () => {
    on_save?.({
      title,
      content,
      color: selected_color,
      background: selected_background,
    });
  };

  const handle_color_select = (color) => {
    console.log("color selected");

    set_selected_color(color);
    set_selected_background(null);
  };

  const handle_background_select = (background) => {
    set_selected_background(background.value);
    set_selected_color("transparent");
    console.log("bg selected");
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
              Save note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
