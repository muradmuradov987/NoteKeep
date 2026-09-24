import dayjs from "dayjs";

export const build_timeline_items = (notes, tasks, reminders) => {
  const items = [];

  notes.forEach((note) => {
    items.push({
      id: `note-${note.id}`,
      type: "note",
      title: note.title,
      subtitle: note.content?.slice(0, 80) || "",
      timestamp: note.createdAt,
      icon: "📝",
      color: note.color || "#6063EE",
    });
  });

  tasks.forEach((task) => {
    items.push({
      id: `task-${task.id}`,
      type: "task",
      title: task.title,
      subtitle:
        task.status === "done"
          ? "Marked as done"
          : task.status === "inprogress"
            ? "Moved to In Progress"
            : "Created in To Do",
      timestamp: task.updatedAt,
      icon: task.status === "done" ? "✅" : "☑️",
      color:
        task.priority === "High"
          ? "#dc2626"
          : task.priority === "Medium"
            ? "#f59e0b"
            : "#6366f1",
    });
  });

  reminders.forEach((reminder) => {
    items.push({
      id: `reminder-${reminder.id}`,
      type: "reminder",
      title: reminder.title,
      subtitle: `Scheduled for ${dayjs(reminder.date).format("DD MMM")} at ${reminder.time}`,
      timestamp: reminder.createdAt,
      icon: "🔔",
      color: "#0ea5e9",
    });
  });

  return items.sort((a, b) => dayjs(b.timestamp).diff(dayjs(a.timestamp)));
};

export const group_timeline_by_day = (items) => {
  const groups = {};

  items.forEach((item) => {
    const day_key = dayjs(item.timestamp).format("YYYY-MM-DD");
    if (!groups[day_key]) groups[day_key] = [];
    groups[day_key].push(item);
  });

  return Object.entries(groups).sort((a, b) => (a[0] < b[0] ? 1 : -1));
};

export const format_day_label = (day_key) => {
  const today = dayjs().format("YYYY-MM-DD");
  const yesterday = dayjs().subtract(1, "day").format("YYYY-MM-DD");

  if (day_key === today) return "Today";
  if (day_key === yesterday) return "Yesterday";
  return dayjs(day_key).format("dddd, DD MMMM");
};
