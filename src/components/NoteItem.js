import React from 'react';

const NoteItem = ({ note }) => {
  const formattedDate = new Date(note.date).toLocaleString();

  return (

    
      <div className="card mx-3 my-3 col-md-3" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
    <p className="card-text">{note.description}</p>
    <small className="text-muted">Created on: {formattedDate}</small>
    <i className="fa-solid fa-pen-to-square mx-3" name="deleteicon"></i>
    <i className="fa-solid fa-trash mx-3" name="updateicon"></i>
  </div>
</div>

  );
};

export default NoteItem;