import React, { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

const NoteItem = ({ note, onEdit,ondelete }) => {
  const { deleteNote } = useContext(NoteContext);


  return (
    <div className="card mx-3 my-3 col-md-3" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
        <p className="card-text">{note.description}</p>
        <small className="text-muted">Created on: {new Date(note.date).toLocaleString()}</small>
        <div className="mt-2">
          <i className="fa-solid fa-pen-to-square mx-2" title="Edit" style={{ cursor: 'pointer' }} onClick={() => onEdit(note)}></i>
          <i className="fa-solid fa-trash mx-2 text-danger" title="Delete" onClick={()=>ondelete(note._id)} style={{ cursor: 'pointer' }}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
