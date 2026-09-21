import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addNote,
  updateNote,
  togglePin,
  toggleArchive,
  deleteNote,
  reorderNotes,
} from "../../redux/features/notes/notesSlice";
import NoteCard from "../../components/NoteCard/NoteCard";
import NoteModal from "../../components/NoteModal/NoteModal";
import AddNoteBtn from "../../components/UI/Buttons/AddNoteBtn/AddNoteBtn";

const Notes = () => {
  const [noteModal, setNoteModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  }),
  useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,   
      tolerance: 5, 
    },
  })
);

  const pinned_notes = useMemo(() => {
    return notes
      .filter((n) => n.pinned && !n.archived)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [notes]);

  const other_notes = useMemo(() => {
    return notes
      .filter((n) => !n.pinned && !n.archived)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [notes]);

  const handleSaveNote = (note) => {
    if (note.title == "") {
      return;
    }
    if (editingNote) {
      dispatch(updateNote(note));
      setNoteModal(false);
    } else {
      const unpinned_orders = notes
        .filter((n) => !n.pinned)
        .map((n) => n.order ?? 0);
      const next_order = unpinned_orders.length
        ? Math.max(...unpinned_orders) + 1
        : 0;
      dispatch(addNote({ ...note, order: next_order }));
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

  const [active_id, set_active_id] = useState(null);

  const handle_drag_start = (event) => {
    set_active_id(event.active.id);
  };

  const handle_pinned_drag_end = (event) => {
    const { active, over } = event;
    set_active_id(null);
    if (!over || active.id === over.id) return;

    const old_index = pinned_notes.findIndex((n) => n.id === active.id);
    const new_index = pinned_notes.findIndex((n) => n.id === over.id);
    const reordered = arrayMove(pinned_notes, old_index, new_index);
    dispatch(reorderNotes({ orderedIds: reordered.map((n) => n.id) }));
  };

  const handle_other_drag_end = (event) => {
    const { active, over } = event;
    set_active_id(null);
    if (!over || active.id === over.id) return;
    const old_index = other_notes.findIndex((n) => n.id === active.id);
    const new_index = other_notes.findIndex((n) => n.id === over.id);
    const reordered = arrayMove(other_notes, old_index, new_index);
    dispatch(reorderNotes({ orderedIds: reordered.map((n) => n.id) }));
  };

  const active_note = notes.find((n) => n.id === active_id);
  return (
    <div className="page_body">
      <h1 className="body_title">Notes</h1>
      <AddNoteBtn onClick={() => setNoteModal(true)} />
      <NoteModal
        is_open={noteModal}
        on_close={handleCloseNote}
        on_save={handleSaveNote}
        note={editingNote}
      />

      {pinned_notes.length > 0 && (
        <>
          <h3 style={{ marginBottom: "20px" }}>Pinned</h3>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handle_drag_start}
            onDragEnd={handle_pinned_drag_end}
          >
            <SortableContext
              items={pinned_notes.map((n) => n.id)}
              strategy={rectSortingStrategy}
            >
              <div className="row notes-grid">
                {pinned_notes.map((note) => (
                  <div className="col-6 col-lg-3" key={note.id}>
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
            </SortableContext>
            <DragOverlay>
              {active_note ? (
                <div style={{ width: "100%" }}>
                  <NoteCard note={active_note} />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </>
      )}

      {other_notes.length > 0 && (
        <>
          {/* <h3 style={{ marginBottom: "20px" }}>Others</h3> */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handle_drag_start}
            onDragEnd={handle_other_drag_end}
          >
            <SortableContext
              items={other_notes.map((n) => n.id)}
              strategy={rectSortingStrategy}
            >
              <div className="row notes-grid">
                {other_notes.map((note) => (
                  <div className="col-6 col-lg-3" key={note.id}>
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
            </SortableContext>
            <DragOverlay>
              {active_note ? (
                <div style={{ width: "100%" }}>
                  <NoteCard note={active_note} />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </>
      )}
    </div>
  );
};

export default Notes;

// <div className="notes-grid">
//   {notes.map((note) => (
//     <NoteCard key={note.id} note={note} />
//   ))}
// </div>
