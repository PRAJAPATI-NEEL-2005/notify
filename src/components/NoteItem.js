import React from 'react';

const NoteItem = ({ note }) => {
  const formattedDate = new Date(note.date).toLocaleString();

  return (

    
      <div class="card mx-3 my-3 col-md-3" style={{width: "18rem"}}>
  <div class="card-body">
    <h5 class="card-title">{note.title}</h5>
    <h6 class="card-subtitle mb-2 text-body-secondary">{note.tag}</h6>
    <p class="card-text">{note.description}</p>
    <small className="text-muted">Created on: {formattedDate}</small>
  </div>
</div>

  );
};

export default NoteItem;