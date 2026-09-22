import { NavLink } from "react-router";
import styles from "../SideBar/SideBar.module.css";

export const SideBar = ({ open, onClose }) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "dashboard",
      filled: true,
    },
    {
      name: "Notes",
      path: "/notes",
      icon: "description",
    },
    {
      name: "Tasks",
      path: "/tasks",
      icon: "check_circle",
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: "calendar_today",
    },
    {
      name: "Reminders",
      path: "/reminders",
      icon: "notifications_active",
    },
    {
      name: "Timeline",
      path: "/timeline",
      icon: "timeline",
    },
    {
      name: "Archive",
      path: "/archive",
      icon: "archive",
    },
    {
      name: "Trash",
      path: "/trash",
      icon: "delete",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "settings",
    },
  ];

  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
      <div className={styles.sidebar_brand}>
        <div className={styles.brand_content}>
          <div>
            <h1 className={styles.brand_title}>NoteKeep</h1>
            <p className={styles.brand_subtitle}>Productivity Pro</p>
          </div>
          <span className={`material-symbols-outlined ${styles.logo_icon}`} onClick={onClose}>
            close
          </span>
        </div>
      </div>
      <div className={styles.sidebar_menu}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `${styles.sidebar_link} ${isActive ? styles.active : ""}`
            }
          >
            <span
              className={`material-symbols-outlined ${
                item.filled ? styles.filled : ""
              }`}
            >
              {item.icon}
            </span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
