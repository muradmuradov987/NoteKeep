import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteNote,toggleArchive,} from "../../redux/features/notes/notesSlice";
import NoteCard from "../../components/NoteCard/NoteCard";

const Archive = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const archived_notes = notes.filter((note) => note.archived);
  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };
  const handleToggleArchive = (id) => {
    dispatch(toggleArchive(id));
  };

  return (
    <div className="page_body">
      <h1 className="body_title">Archive</h1>

      {archived_notes.length === 0 ? (
        <p>There are no records in the archive.</p>
      ) : (
        <div className="row notes-grid">
          {archived_notes.map((note) => (
            <div className="col-lg-3" key={note.id}>
              <NoteCard
                note={note}
                onDelete={() => handleDeleteNote(note.id)}
                onToggleArchive={() => handleToggleArchive(note.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Archive;
