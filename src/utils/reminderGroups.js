import dayjs from "dayjs";

export const group_reminders_by_date = (reminders) => {
  const today = dayjs().format("YYYY-MM-DD");
  const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD");

  const sorted = [...reminders].sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.time.localeCompare(b.time);
  });

  const groups = {
    Today: [],
    Tomorrow: [],
    Upcoming: [],
    Past: [],
  };

  sorted.forEach((reminder) => {
    if (reminder.date === today) {
      groups.Today.push(reminder);
    } else if (reminder.date === tomorrow) {
      groups.Tomorrow.push(reminder);
    } else if (reminder.date > today) {
      groups.Upcoming.push(reminder);
    } else {
      groups.Past.push(reminder);
    }
  });

  return groups;
};
