import React, { useContext, useEffect, useState, useCallback } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import AuthContext from '../context/authentication/authContext';
import { useNavigate } from 'react-router-dom';

function Home(props) {
  const context = useContext(NoteContext);
  const { notes, fetchNotes, editNote, deleteNote } = context;
  const { isAuthenticated } = useContext(AuthContext);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const navigate = useNavigate();
  
  const handledelete = async(note_id) => {
    const success = await deleteNote(note_id);
    if (success) {
      props.showalert("Note deleted successfully", "success");
    } else {
      props.showalert("Some error occurred", "danger");
    }
  };
  
  const checkAuthAndFetchNotes = useCallback(() => {
    if (!isAuthenticated) {
      navigate('/login');
      props.showalert("Login required to access notes", "warning");
    } else {
      fetchNotes(); 
    }
  }, [isAuthenticated, navigate, fetchNotes, props]);
  
  useEffect(() => {
    checkAuthAndFetchNotes();
  }, [checkAuthAndFetchNotes]);

  const handleEditClick = (note) => {
    setNoteToEdit({ ...note }); // set note in modal
    const modal = new window.bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  };

  const handleSaveChanges = async() => {
    if (noteToEdit) {
      const success = await editNote(noteToEdit._id, noteToEdit.title, noteToEdit.description, noteToEdit.tag);
      if (success) {
        props.showalert("Notes updated successfully", "success");
      } else {
        props.showalert("Some error occurred during update", "danger");
      }
    }
  };

  const handleChange = (e) => {
    setNoteToEdit({ ...noteToEdit, [e.target.name]: e.target.value });
  };

  return (
    <div className='container'>
      <h1 className="page-title">Your Notes Dashboard</h1>
      
      <div className="form-section">
        <h2 className="section-title">
          <i className="fas fa-plus-circle"></i> Add New Note
        </h2>
        <AddNote showalert={props.showalert} />
      </div>

      <h2 className="section-title mt-4">
        <i className="fas fa-sticky-note"></i> Your Notes
      </h2>
      
      {notes.length === 0 ? (
        <div className="empty-notes">
          <i className="fas fa-file-alt"></i>
          <p>No notes to display. Create your first note above!</p>
        </div>
      ) : (
        <div className='note-grid'>
          {notes.map((note) => (
            <NoteItem 
              key={note._id} 
              note={note} 
              onEdit={handleEditClick} 
              ondelete={handledelete} 
            />
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveChanges();
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="fas fa-edit me-2" style={{ color: "var(--primary)" }}></i>
                  Edit Note
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    minLength={5}
                    required
                    className="form-control"
                    placeholder="Title"
                    value={noteToEdit?.title || ''}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    minLength={5}
                    required
                    className="form-control"
                    placeholder="Description"
                    rows="4"
                    value={noteToEdit?.description || ''}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input
                    id="tag"
                    name="tag"
                    type="text"
                    required
                    className="form-control"
                    placeholder="Tag"
                    value={noteToEdit?.tag || ''}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
