import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [
    {
      id: "task-1",
      title: "Design System Update",
      description:
        "Incorporate new pastel tokens and verify contrast ratios across all primary components.",
      priority: "High",
      status: "todo",
      dueDate: "2026-09-24",
      order: 0,
      createdAt: "2026-09-18T09:00:00.000Z",
      updatedAt: "2026-09-18T09:00:00.000Z",
    },
    {
      id: "task-2",
      title: "User Interview Synthesis",
      description:
        "Compile notes from last week's discovery calls into actionable insights.",
      priority: "Medium",
      status: "todo",
      dueDate: "2026-09-26",
      order: 1,
      createdAt: "2026-09-18T10:30:00.000Z",
      updatedAt: "2026-09-18T10:30:00.000Z",
    },
    {
      id: "task-3",
      title: "Write Unit Tests for Auth Module",
      description: "Cover login, signup and password reset flows with Jest.",
      priority: "Low",
      status: "todo",
      dueDate: "2026-09-30",
      order: 2,
      createdAt: "2026-09-19T11:00:00.000Z",
      updatedAt: "2026-09-19T11:00:00.000Z",
    },

    {
      id: "task-4",
      title: "Implement Dashboard Widget",
      description:
        "Develop the main analytics widget for the user dashboard using the updated charting library.",
      priority: "High",
      status: "inprogress",
      dueDate: "2026-09-21",
      order: 0,
      createdAt: "2026-09-15T08:00:00.000Z",
      updatedAt: "2026-09-20T14:20:00.000Z",
    },
    {
      id: "task-5",
      title: "Setup Project Repository",
      description:
        "Initialize repo, configure ESLint, Prettier and CI pipeline.",
      priority: "Low",
      status: "done",
      dueDate: "2026-09-10",
      order: 0,
      createdAt: "2026-09-08T09:00:00.000Z",
      updatedAt: "2026-09-10T16:45:00.000Z",
    },
    {
      id: "task-6",
      title: "Wireframe Homepage Layout",
      description:
        "Low-fidelity wireframes for hero, features and footer sections.",
      priority: "Medium",
      status: "done",
      dueDate: "2026-09-14",
      order: 1,
      createdAt: "2026-09-11T09:00:00.000Z",
      updatedAt: "2026-09-14T12:00:00.000Z",
    },
  ],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },

    updateTask: (state, action) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },

    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },

    moveTask: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find((t) => t.id === id);
      if (task) {
        task.status = status;
      }
    },

    reorderColumn: (state, action) => {
      const { status, orderedIds } = action.payload;
      orderedIds.forEach((id, index) => {
        const task = state.tasks.find((t) => t.id === id);
        if (task) {
          task.order = index;
        }
      });
    },
  },
});

export const { addTask, updateTask, deleteTask, moveTask, reorderColumn } =
  tasksSlice.actions;
export default tasksSlice.reducer;
