import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import styles from "../Navbar/Navbar.module.css";
import profile from "../../assets/images/profile.jpg";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const reminders_count = useSelector(
    (state) => state.reminders.reminders.length,
  );

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
        <button className={styles.action_btn} onClick={() => navigate("/reminders")}>
          <span className="material-symbols-outlined">notifications</span>
          {reminders_count > 0 && (
            <span className={styles.bell_badge}>{reminders_count} </span>
          )}
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
            src={profile}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
