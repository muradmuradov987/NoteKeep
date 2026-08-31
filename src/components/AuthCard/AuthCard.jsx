import { useState } from "react";
import styles from "../AuthCard/AuthCard.module.css";
import LoginPanel from "../LoginPanel/LoginPanel";
import SignUpPanel from "../SignUpPanel/SignUpPanel";

const AuthCard = () => {
  const [changeAuth, setChangeAuth] = useState(true);


  return (
    <div className={styles.main_container}>
      <div className={styles.left_panel}>
        <div className={styles.gradient_overlay}></div>
        <img
          className={styles.illustration_img}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS73uZSSyrqH7vMYakJEziW3nDRVeGuFuIM9V_EJ072-AhIT996qTw1ho&s=10"
        />
        <div className={styles.glass_card}>
          <h2 className={styles.glass_title}>Organize your thoughts.</h2>
          <p className={styles.glass_text}>
            Capture ideas, manage tasks, and stay productive in a beautifully
            minimal workspace.
          </p>
        </div>
      </div>

      {changeAuth ? (
        <LoginPanel onToggleAuth={() => setChangeAuth(false)}/>
      ) : (
        <SignUpPanel onToggleAuth={() => setChangeAuth(true)}/>
      )}
    </div>
  );
};

export default AuthCard;
