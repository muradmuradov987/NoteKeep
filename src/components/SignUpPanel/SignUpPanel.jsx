import { useNavigate } from "react-router";
import styles from "../SignUpPanel/SignUpPanel.module.css";

const SignUpPanel = ({ onToggleAuth }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.right_panel}>
      <div className={styles.panel_header}>
        <div className={styles.logo_area}>
          <span
            className={`material-symbols-outlined ${styles.logo_icon}`}
            data-icon="edit_note"
          >
            edit_note
          </span>

          <h1 className={styles.logo_text}>NoteKeep</h1>
        </div>

        <h2 className={styles.form_title}>Create an account</h2>

        <p className={styles.form_subtitle}>
          Start organizing your thoughts today.
        </p>
      </div>

      <form className={styles.auth_form}>
        <div className={styles.input_group}>
          <label className={styles.input_label}>Full Name</label>

          <div className={styles.input_wrapper}>
            <span
              className={`material-symbols-outlined ${styles.input_icon}`}
              data-icon="person"
            >
              person
            </span>

            <input
              className={styles.form_input}
              id="name-signup"
              placeholder="Enter your full name"
              type="text"
            />
          </div>
        </div>

        <div className={styles.input_group}>
          <label className={styles.input_label}>Email</label>

          <div className={styles.input_wrapper}>
            <span
              className={`material-symbols-outlined ${styles.input_icon}`}
              data-icon="mail"
            >
              mail
            </span>

            <input
              className={styles.form_input}
              id="email-signup"
              placeholder="Enter your email"
              type="email"
            />
          </div>
        </div>

        <div className={styles.input_group}>
          <label className={styles.input_label}>Password</label>

          <div className={styles.input_wrapper}>
            <span
              className={`material-symbols-outlined ${styles.input_icon}`}
              data-icon="lock"
            >
              lock
            </span>

            <input
              className={styles.form_input}
              id="password-signup"
              placeholder="Create a password"
              type="password"
            />
          </div>
        </div>

        <button
          className={`${styles.btn} ${styles.btn_primary}`}
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          Sign Up
        </button>
      </form>

      <p className={styles.footer_text}>
        Already have an account?
        <span className={styles.auth_link} onClick={() => onToggleAuth(true)}>
          Log in
        </span>
      </p>
    </div>
  );
};

export default SignUpPanel;
