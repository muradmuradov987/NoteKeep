import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNote,
  deleteNote,
  togglePin,
  toggleArchive,
  updateNote,
} from "../../redux/features/notes/notesSlice";
import NoteCard from "../../components/NoteCard/NoteCard";
import NoteModal from "../../components/NoteModal/NoteModal";
import AddNoteBtn from "../../components/UI/Buttons/AddNoteBtn/AddNoteBtn";

const Notes = () => {
  const [noteModal, setNoteModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes.notes);

  const visible_notes = useMemo(() => {
    return notes
      .filter((note) => !note.archived)
      .sort((a, b) => {
        if (a.pinned === b.pinned) return 0;
        return a.pinned ? -1 : 1;
      });
  }, [notes]);

  const handleSaveNote = (note) => {
    if (note.title == "") {
      return;
    }
    if (editingNote) {
      dispatch(updateNote(note));
      setNoteModal(false);
    } else {
      dispatch(addNote(note));
      setNoteModal(false);
    }
  };

  const handleCloseNote = () => {
    setNoteModal(false);
    setEditingNote(null);
  };

  const handleCardClick = (note) => {
    setEditingNote(note);
    setNoteModal(true);
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };
  const handleTogglePin = (id) => {
    dispatch(togglePin(id));
  };

  const handleToggleArchive = (id) => {
    dispatch(toggleArchive(id));
  };

  return (
    <div className="page_body">
      <h1 className="body_title">Notes </h1>
      <AddNoteBtn onClick={() => setNoteModal(true)} />
      <NoteModal
        is_open={noteModal}
        on_close={() => handleCloseNote()}
        on_save={handleSaveNote}
        note={editingNote}
      />

      <div className="row notes-grid">
        {visible_notes.map((note) => (
          <div className="col-lg-3" key={note.id}>
            <NoteCard
              note={note}
              onClick={() => handleCardClick(note)}
              onDelete={() => handleDeleteNote(note.id)}
              onTogglePin={() => handleTogglePin(note.id)}
               onToggleArchive={() => handleToggleArchive(note.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;

// <div className="notes-grid">
//   {notes.map((note) => (
//     <NoteCard key={note.id} note={note} />
//   ))}
// </div>
