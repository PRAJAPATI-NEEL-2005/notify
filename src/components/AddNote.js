import React, { useState, useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

function AddNote(props) {
  const { addNote } = useContext(NoteContext);

  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: ''
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const success = await addNote(note.title, note.description, note.tag);
    if (success) {
      props.showalert("Note added successfully", "success");
    } else {
      props.showalert("Some error occurred", "danger");
    }
    setNote({ title: '', description: '', tag: '' });
  };

  return (
    <form className="text-start" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input 
              type="text" 
              className="form-control" 
              id="title" 
              name="title" 
              minLength={5}
              value={note.title}
              onChange={handleChange}
              placeholder="Enter note title..."
              required
            />
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input 
              type="text" 
              className="form-control" 
              id="tag" 
              name="tag" 
              value={note.tag}
              onChange={handleChange}
              placeholder="Enter tag (e.g. work, personal, ideas)"
            />
          </div>
        </div>
        
        <div className="col-12">
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea 
              className="form-control" 
              id="description" 
              name="description" 
              minLength={5}
              rows="3"
              value={note.description}
              onChange={handleChange}
              placeholder="What's on your mind?"
              required
            ></textarea>
          </div>
        </div>
        
        <div className="col-12">
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            <i className="fas fa-plus me-2"></i>
            Add Note
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddNote;
