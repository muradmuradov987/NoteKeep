import { useState } from "react";
import NoteCard from "../../components/NoteCard/NoteCard";
import NoteModal from "../../components/NoteModal/NoteModal";
import AddNoteBtn from "../../components/UI/Buttons/AddNoteBtn/AddNoteBtn";

const Notes = () => {
  const [noteModal, setNoteModal] = useState(false);

  const handleSaveNote = (note) => {
    console.log(note);
    setNoteModal(false);
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
      <div className="row">
        <div className="col-lg-3">
          <NoteCard />
        </div>
      </div>
    </div>
  );
};

export default Notes;
