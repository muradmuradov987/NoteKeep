import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const generate_dummy_reminders = () => {
  const today = dayjs();

  return [
    {
      id: "reminder-1",
      title: "Sprint Update",
      description: "Review Q3 progress and blockages.",
      date: today.format("YYYY-MM-DD"),
      time: "09:00",
      createdAt: today.toISOString(),
    },
    {
      id: "reminder-2",
      title: "Client Meeting",
      description: "Discuss initial mockups for NoteKeep v2.",
      date: today.format("YYYY-MM-DD"),
      time: "11:30",
      createdAt: today.toISOString(),
    },
    {
      id: "reminder-3",
      title: "Submit Weekly Report",
      description: "Send the weekly progress report to the team lead.",
      date: today.format("YYYY-MM-DD"),
      time: "17:00",
      createdAt: today.toISOString(),
    },

    {
      id: "reminder-4",
      title: "Design Review",
      description:
        "Walk through the new dashboard components with the design team.",
      date: today.add(1, "day").format("YYYY-MM-DD"),
      time: "10:00",
      createdAt: today.toISOString(),
    },
    {
      id: "reminder-5",
      title: "Team Sync",
      description: "Weekly check-in with the engineering team.",
      date: today.add(1, "day").format("YYYY-MM-DD"),
      time: "15:00",
      createdAt: today.toISOString(),
    },

    {
      id: "reminder-6",
      title: "Project Alpha Brainstorm",
      description: "Gather ideas for the upcoming marketing campaign.",
      date: today.add(3, "day").format("YYYY-MM-DD"),
      time: "14:00",
      createdAt: today.toISOString(),
    },

    {
      id: "reminder-7",
      title: "Invoice Submission",
      description: "Submit the invoice for last month's services.",
      date: today.subtract(2, "day").format("YYYY-MM-DD"),
      time: "09:30",
      createdAt: today.toISOString(),
    },
  ];
};

const initialState = {
  reminders: generate_dummy_reminders(),
};

const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    addReminder: (state, action) => {
      state.reminders.push(action.payload);
    },

    updateReminder: (state, action) => {
      const index = state.reminders.findIndex(
        (r) => r.id === action.payload.id,
      );
      if (index !== -1) {
        state.reminders[index] = action.payload;
      }
    },

    deleteReminder: (state, action) => {
      state.reminders = state.reminders.filter((r) => r.id !== action.payload);
    },
  },
});

export const { addReminder, updateReminder, deleteReminder } =
  remindersSlice.actions;
export default remindersSlice.reducer;
