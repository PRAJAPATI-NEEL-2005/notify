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

const speakNote = ( description) => {
  const text = ` ${description}`;
  const utterance = new SpeechSynthesisUtterance(text);

  const setFemaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return;

    // Find a voice with a typically female name or known female voice
    const femaleVoices = voices.filter(voice =>
      /Samantha|Karen|Victoria|Zira|Jenny|Google US English|female|en-US/i.test(voice.name)
    );

    // Use preferred female voice or fallback to the first available
    utterance.voice = femaleVoices[0] || voices[0];

    utterance.lang = utterance.voice.lang || 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1.2; // More feminine tone
    window.speechSynthesis.speak(utterance);
  };

  // Handle async loading of voices
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = setFemaleVoice;
  } else {
    setFemaleVoice();
  }
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

      <div className="note-card-actions d-flex gap-2">
        {/* 👇 Speak Button */}
        <button 
          className="btn btn-sm btn-outline-secondary" 
          onClick={() => speakNote( note.description)}
          title="Speak Note"
        >
          <i className="fa-solid fa-volume-high"></i>
        </button>

        {/* ✏️ Edit Button */}
        <button 
          className="btn btn-sm btn-outline-primary" 
          onClick={() => onEdit(note)}
          title="Edit"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>

        {/* 🗑️ Delete Button */}
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
