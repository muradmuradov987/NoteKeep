import styles from "../AddNotes/AddNotes.module.css";
const AddNotes = () => {
  return (
    <div className={styles.button_container}>
      <button className={styles.new_task_button}>
        <span className={styles.plus_icon}>+</span>
        <span className={styles.button_text}>New Task</span>
      </button>
    </div>
  );
};

export default AddNotes;
