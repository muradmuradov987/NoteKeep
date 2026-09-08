import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },

    deleteNote: (state, action) => {
      state.notes = state.notes.filter(
        (note) => note.id !== action.payload
      );
    },
  },
});

export const { addNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
