import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
function Home() {
  const context = useContext(NoteContext);
  const{notes,setnotes}=context;
  return (
    <div className='row my-3'>
      <h1>Your Notes</h1>
  {notes.length === 0 && <p>No notes to display</p>}
        {notes.map((note, index) => (
          <div className="col-md-4" key={index}>
            <NoteItem note={note} />
          </div>
        ))}
    </div>
  )
}

export default Home
