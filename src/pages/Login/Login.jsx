import AuthCard from "../../components/AuthCard/AuthCard";
import styles from "../Login/Login.module.css";

const Login = () => {
  return (
    <div className={styles.login_body}>
        <AuthCard/>
    </div>
  );
};

export default Login;
