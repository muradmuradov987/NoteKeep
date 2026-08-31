import { useEffect, useState } from "react";
import styles from "../Navbar/Navbar.module.css";

const Navbar = ({ onMenuClick }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  return (
    <header className={styles.app_header}>
      <button className={styles.mobile_menu_btn} onClick={onMenuClick}>
        <span className="material-symbols-outlined">menu</span>
      </button>
      <div className={styles.search_container}>
        <span className={`material-symbols-outlined ${styles.search_icon}`}>
          search
        </span>

        <input
          className={styles.search_input}
          placeholder="Search tasks, notes..."
          type="text"
        />
      </div>

      <div className={styles.header_actions}>
        <button className={styles.action_btn}>
          <span className="material-symbols-outlined">notifications</span>
        </button>

        <button
          className={`${styles.action_btn} ${styles.theme_toggle_btn}`}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <span className="material-symbols-outlined">light_mode</span>
          ) : (
            <span className="material-symbols-outlined">dark_mode</span>
          )}
        </button>

        <div className={styles.user_avatar_wrapper}>
          <img
            alt="User profile photo"
            className={styles.user_avatar_img}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFlsktI1CFc8wl4g86fC_lbR02EnrJsUpMb51O2uwSxrqhEkSXoWFtAr_w&s=10"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
