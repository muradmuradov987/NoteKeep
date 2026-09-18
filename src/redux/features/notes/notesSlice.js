import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    {
      id: crypto.randomUUID(),
      title: "What is Lorem Ipsum?",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.",
      color: "#87b157",
      background: null,
      pinned: false,
      archived: false,
      createdAt: "Mon,Jun 24, 2026",
      updatedAt: "Thu,Jun 27, 2026",
    },
    {
      id: crypto.randomUUID(),
      title: "Why do we use it?",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
      color: "#9565bf",
      background: null,
      pinned: false,
      archived: false,
      createdAt: "Mon,Jun 24, 2026",
      updatedAt: "Thu,Jun 27, 2026",
    },
  ],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },

    updateNote: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note.id === action.payload.id,
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    togglePin: (state, action) => {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) {
        note.pinned = !note.pinned;
      }
    },
    toggleArchive: (state, action) => {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) {
        note.archived = !note.archived;
        note.pinned = false; 
      }
    },

    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, updateNote, togglePin,toggleArchive, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
