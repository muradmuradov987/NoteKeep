import { configureStore } from '@reduxjs/toolkit'
import notesReducer from "../redux/features/notes/notesSlice";
export const store = configureStore({
  reducer: {
    notes:notesReducer
  },
})