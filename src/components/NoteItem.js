import React from 'react';

const NoteItem = ({ note, onEdit, ondelete }) => {
  // Function to format date in a more readable way
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Generate a random pastel color based on the tag name
  const getTagColor = (tag) => {
    const colors = [
      'var(--info)', 'var(--success)', '#FFD6A5', '#CAFFBF', 
      '#9BF6FF', '#BDB2FF', '#FFC6FF', '#FDFFB6'
    ];
    
    // Simple hash function to get consistent color for the same tag
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="card note-card h-100">
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        
        {note.tag && (
          <div 
            className="note-tag"
            style={{ backgroundColor: getTagColor(note.tag) }}
          >
            {note.tag}
          </div>
        )}
        
        <p className="card-text">{note.description}</p>
        
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <small className="text-muted">
            <i className="far fa-clock me-1"></i> {formatDate(note.date)}
          </small>
          
          <div className="note-card-actions">
            <button 
              className="btn btn-sm btn-outline-primary me-2" 
              onClick={() => onEdit(note)}
              title="Edit"
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </button>
            
            <button 
              className="btn btn-sm btn-outline-danger" 
              onClick={() => ondelete(note._id)}
              title="Delete"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
