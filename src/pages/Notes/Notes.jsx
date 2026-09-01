import NoteCard from "../../components/NoteCard/NoteCard";
import AddNotes from "../../components/UI/Buttons/AddNotes/AddNotes";

const Notes = () => {
  return (
    <div className="page_body">
      <h1 className="body_title">Notes </h1>
      <AddNotes/>
      <div className="row">
        <div className="col-lg-3">
          <NoteCard/>
        </div>
      </div>
    </div>
  );
};

export default Notes;
