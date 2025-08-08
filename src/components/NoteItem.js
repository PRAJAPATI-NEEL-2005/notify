import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";

const NoteItem = ({ note, onEdit, ondelete }) => {
  const [showModal, setShowModal] = useState(false);

  // Format date
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

  // Tag color (beige & blue tones)
  const getTagColor = (tag) => {
    const colors = [
      '#D9CAB3', // Soft Beige
      '#B8C6D9', // Light Slate Blue
      '#A7BBC7', // Muted Blue Gray
      '#E6D5B8', // Warm Beige
      '#8CA1A5', // Dusty Blue
      '#CFC1A3', // Sand Beige
      '#9BB1BC', // Cool Grayish Blue
      '#F0E6D2'  // Pale Cream Beige
    ];
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  // Text-to-speech
  const speakNote = (description) => {
    const utterance = new SpeechSynthesisUtterance(description);
    const setFemaleVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      const femaleVoices = voices.filter(voice =>
        /Samantha|Karen|Victoria|Zira|Jenny|Google US English|female|en-US/i.test(voice.name)
      );
      utterance.voice = femaleVoices[0] || voices[0];
      utterance.lang = utterance.voice.lang || 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    };
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = setFemaleVoice;
    } else {
      setFemaleVoice();
    }
  };

  // PDF download - only modal content
  const downloadPDF = async () => {
    const modalContent = document.getElementById("preview-modal-content");
    if (!modalContent) return;

    const canvas = await html2canvas(modalContent, {
      scale: 1,
      useCORS: true,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${note.title || "note"}.pdf`);
  };

  return (
    <>
      {/* Note Card */}
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

          <small className="text-muted d-block mb-2">
            <i className="far fa-clock me-1"></i> {formatDate(note.date)}
          </small>

          <div className="note-card-actions d-flex gap-2">
            <button 
              className="btn btn-sm btn-outline-secondary" 
              onClick={() => speakNote(note.description)}
              title="Speak Note"
            >
              <i className="fa-solid fa-volume-high"></i>
            </button>

            <button 
              className="btn btn-sm btn-outline-primary" 
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

            <button 
              className="btn btn-sm btn-outline-success"
              onClick={() => setShowModal(true)}
              title="Preview Note"
            >
              <i className="fa-solid fa-eye"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showModal && (
        <>
          {/* Backdrop */}
          <div className="modal-backdrop fade show"></div>

          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content" id="preview-modal-content">
                
                <div className="modal-header">
                  <h5 className="modal-title">
                    <i
                      className="fas fa-file-alt me-2"
                      style={{ color: 'var(--primary)' }}
                    ></i>
                    Preview Note
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <div className="form-control bg-light">{note.title}</div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <div
                      className="form-control bg-light"
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {note.description}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <div className="form-control bg-light">{note.tag}</div>
                  </div>

                  <small className="text-muted">
                    <i className="far fa-clock me-1"></i> {formatDate(note.date)}
                  </small>
                </div>

                <div className="modal-footer">
                 
                   <button
    type="button"
    className="btn btn-info"
    onClick={() => {
      const shareData = {
        title: note.title,
        text: `Title: ${note.title}\n\nDescription: ${note.description}\n\nTag: ${note.tag}`,
      };

      if (navigator.share) {
        navigator.share(shareData)
          .catch(err => console.error('Error sharing:', err));
      } else {
        navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}`)
          .then(() => alert("Note copied to clipboard!"))
          .catch(err => console.error('Error copying:', err));
      }
    }}
  >
    <i className="fa-solid fa-share-nodes me-1"></i> Share
  </button>

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={downloadPDF}
                  >
                    Download as PDF
                  </button>
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NoteItem;
