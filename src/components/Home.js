import React, { useContext, useEffect, useCallback,useState } from 'react';
import NoteContext from '../context/notes/noteContext';
import AuthContext from '../context/authentication/authContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate, Link } from 'react-router-dom';

function Home(props) {
  const context = useContext(NoteContext);
  const { notes, fetchNotes, deleteNote,editNote } = context;
  const { isAuthenticated } = useContext(AuthContext);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const navigate = useNavigate();

  const handledelete = async (note_id) => {
    const success = await deleteNote(note_id);
    if (success) {
      props.showalert('Note deleted successfully', 'success');
    } else {
      props.showalert('Some error occurred', 'danger');
    }
  };

  const checkAuthAndFetchNotes = useCallback(() => {
    if (!isAuthenticated) {
      navigate('/login');
      props.showalert('Login required to access notes', 'warning');
    } else {
      fetchNotes();
    }
  }, [isAuthenticated, navigate, fetchNotes, props]);

  useEffect(() => {
    checkAuthAndFetchNotes();
  }, [checkAuthAndFetchNotes]);

  const latestThreeNotes = notes.slice(0, 3);
  const handleEditClick = (note) => {
    setNoteToEdit({ ...note }); // set note in modal
    const modal = new window.bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  };

  const handleSaveChanges = async () => {
    if (noteToEdit) {
      const success = await editNote(
        noteToEdit._id,
        noteToEdit.title,
        noteToEdit.description,
        noteToEdit.tag
      );
      if (success) {
        props.showalert('Notes updated successfully', 'success');
      } else {
        props.showalert('Some error occurred during update', 'danger');
      }
    }
  };

  const handleChange = (e) => {
    setNoteToEdit({ ...noteToEdit, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-5">
      <div className="jumbotron p-4 p-md-5 text-white rounded bg-white mb-4 shadow-sm">
        <div className="col-md-10 px-0">
          <h1 className="display-5 fw-bold text-dark">Welcome to <span className="text-primary">Notify</span> ✍️</h1>
          <p className="lead text-muted mt-3">
            Transform your thoughts into organized ideas. Whether it's a bright spark of inspiration or your daily to-do list, <strong>Notify</strong> is here to make capturing your mind easier than ever.
          </p>
          <p className="text-dark mt-2">
            Think it. Note it. Master your day—one thought at a time.
          </p>
          <p className="lead mb-0 mt-3">
            <Link to="/yournotes" className="btn btn-outline-primary btn-lg">
              Explore All Notes <i className="fas fa-book-open ms-2"></i>
            </Link>
          </p>
        </div>
      </div>

      <div className="form-section mb-5">
        <h2 className="section-title">
          <i className="fas fa-plus-circle me-2"></i> Add New Note
        </h2>
        <hr />
        <AddNote showalert={props.showalert} />
      </div>

      <div className="latest-notes-section bg-white">
        <h2 className="section-title">
          <i className="fas fa-star me-2"></i> Latest Notes
        </h2>
        <hr />
        {latestThreeNotes.length === 0 ? (
          <div className="empty-notes text-center py-4">
            <i className="fas fa-file-alt fa-2x text-muted mb-2"></i>
            <p>No recent notes to display. Add one above!</p>
          </div>
        ) : (
          <div className="note-grid">
            {latestThreeNotes.map((note) => (
              <NoteItem
                key={note._id}
                note={note}
                onEdit={handleEditClick}
                ondelete={handledelete}
                disableEdit={true}
              />
            ))}
          </div>
        )}
        {notes.length > 3 && (
          <div className="text-center mt-4">
            <Link to="/yournotes" className="btn btn-primary btn-lg">
              View All Notes <i className="fas fa-arrow-right ms-2"></i>
            </Link>
          </div>
        )}
      </div>

       {/* Edit Modal (remains the same) */}
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
                  <i className="fas fa-edit me-2" style={{ color: 'var(--primary)' }}></i>
                  Edit Note
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
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
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
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
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
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
