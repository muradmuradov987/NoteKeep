import { configureStore } from '@reduxjs/toolkit'
import notesReducer from "../redux/features/notes/notesSlice";
import tasksReducer from "../redux/features/tasks/tasksSlice";
export const store = configureStore({
  reducer: {
    notes:notesReducer,
    tasks: tasksReducer,
  },
})