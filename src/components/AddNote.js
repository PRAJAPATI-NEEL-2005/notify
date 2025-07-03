import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

function AddNote() {
  const { addNote } = useContext(NoteContext);

  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: ''
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' });
  };

  return (
    <div className="container my-4">
      <div className="row justify-content-start">
        <div className="col-md-6">
          <form className="text-start" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input 
                type="text" 
                className="form-control" 
                id="title" 
                name="title" 
                value={note.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea 
                className="form-control" 
                id="description" 
                name="description" 
                rows="3"
                value={note.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input 
                type="text" 
                className="form-control" 
                id="tag" 
                name="tag" 
                value={note.tag}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">Add Note</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNote;
