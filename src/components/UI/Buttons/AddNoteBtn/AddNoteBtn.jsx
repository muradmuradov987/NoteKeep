import styles from "./AddNoteBtn.module.css";
const AddNoteBtn = ({ onClick }) => {
  return (
    <div className={styles.button_container}>
      <button className={styles.new_task_button} onClick={onClick}>
        <span className={styles.plus_icon}>+</span>
        <span className={styles.button_text}>New Task</span>
      </button>
    </div>
  );
};

export default AddNoteBtn;
