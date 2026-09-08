import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../../redux/features/notes/notesSlice";
import NoteCard from "../../components/NoteCard/NoteCard";
import NoteModal from "../../components/NoteModal/NoteModal";
import AddNoteBtn from "../../components/UI/Buttons/AddNoteBtn/AddNoteBtn";

const Notes = () => {
  const [noteModal, setNoteModal] = useState(false);
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes.notes);
  const handleSaveNote = (note) => {
    console.log(note);
    setNoteModal(false);
    dispatch(addNote(note));
  };

  return (
    <div className="page_body">
      <h1 className="body_title">Notes </h1>
      <AddNoteBtn onClick={() => setNoteModal(true)} />
      <NoteModal
        is_open={noteModal}
        on_close={() => setNoteModal(false)}
        on_save={handleSaveNote}
      />

      <div className="row notes-grid">
        {notes.map((note) => (
          <div className="col-lg-3" key={note.id}>
            <NoteCard note={note} />
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
