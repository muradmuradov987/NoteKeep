import { useNavigate } from "react-router";
import styles from "../RecentTasksCard/RecentTasksCard.module.css";

const tasks = [
  {
    title: "Draft Q3 Marketing Strategy",
    due_date: "Due today, 5:00 PM",
    priority: "High",
    priority_class: "high",
  },
  {
    title: "Review latest design mockups",
    due_date: "Due tomorrow, 10:00 AM",
    priority: "Medium",
    priority_class: "medium",
  },
  {
    title: "Update client documentation",
    due_date: "Due Friday",
    priority: "Low",
    priority_class: "low",
  },
];

const RecentTasksCard = () => {
    const navigate = useNavigate()
  return (
    <div className={styles.recent_tasks}>
      <div className={styles.tasks_header}>
        <h2 className={styles.tasks_title}>Recent Tasks</h2>
        <button className={styles.view_all} onClick={()=> navigate("/tasks")}>View All</button>
      </div>

      <div className={styles.task_list}>
        {tasks.slice(-3).map((task, index) => (
          <div className={styles.task_item} key={index}>
            <div className={styles.task_content}>
              <h3 className={styles.task_title}>{task.title}</h3>

              <p className={styles.task_due_date}>{task.due_date}</p>
            </div>

            <span
              className={`${styles.priority_badge} ${
                styles[task.priority_class]
              }`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTasksCard;
