import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';

function Home() {
  const context = useContext(NoteContext);
  const { notes, fetchNotes, editNote } = context;

  const [noteToEdit, setNoteToEdit] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleEditClick = (note) => {
    setNoteToEdit({ ...note }); // set note in modal
    const modal = new window.bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  };

  const handleSaveChanges = () => {
    if (noteToEdit) {
      editNote(noteToEdit._id, noteToEdit.title, noteToEdit.description, noteToEdit.tag);
    }
  };

  const handleChange = (e) => {
    setNoteToEdit({ ...noteToEdit, [e.target.name]: e.target.value });
  };

  return (
    <div className='container'>
      <h1>Add Note</h1>
      <AddNote />

      <h1>Your Notes</h1>
      <div className='row my-3'>
        {notes.length === 0 && <p>No notes to display</p>}
        {notes.map((note) => (
          <div className="col-md-4" key={note._id}>
            <NoteItem note={note} onEdit={handleEditClick} />
          </div>
        ))}
      </div>

      {/* Single Global Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input name="title" type="text" className="form-control my-2" placeholder="Title" value={noteToEdit?.title || ''} onChange={handleChange} />
              <textarea name="description" className="form-control my-2" placeholder="Description" value={noteToEdit?.description || ''} onChange={handleChange} />
              <input name="tag" type="text" className="form-control my-2" placeholder="Tag" value={noteToEdit?.tag || ''} onChange={handleChange} />
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSaveChanges}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
