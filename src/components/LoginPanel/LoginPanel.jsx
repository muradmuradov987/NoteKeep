import { useNavigate } from "react-router";
import styles from "../LoginPanel/LoginPanel.module.css";

const LoginPanel = ({ onToggleAuth }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.right_panel}>
      <div className={styles.panel_header}>
        <div className={styles.logo_area}>
          <span className={`material-symbols-outlined ${styles.logo_icon}`}>
            edit_note
          </span>
          <h1 className={styles.logo_text}>NoteKeep</h1>
        </div>

        <h2 className={styles.form_title}>Welcome back</h2>

        <p className={styles.form_subtitle}>
          Please enter your details to sign in to your account.
        </p>
      </div>

      <form className={styles.auth_form}>
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
              id="email"
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
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </div>

          <div className={styles.forgot_password_wrapper}>
            <a className={styles.auth_link} href="#">
              Forgot password?
            </a>
          </div>
        </div>

        <button
          className={`${styles.btn} ${styles.btn_primary}`}
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          Log In
        </button>
      </form>

      <div className={styles.divider}>
        <div className={styles.divider_line}></div>

        <div className={styles.divider_text_wrapper}>
          <span className={styles.divider_text}>Or continue with</span>
        </div>
      </div>

      <button className={`${styles.btn} ${styles.btn_google}`} type="button">
        <img
          className={styles.google_icon}
          data-alt="Google logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGpKxmgHmN060akqAiN_HezdP3Q5xGLz_lxUELn5uNpA&s=10"
        />
        Google
      </button>

      <p className={styles.footer_text}>
        Don't have an account?
        <span className={styles.auth_link} onClick={() => onToggleAuth(false)}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default LoginPanel;
