import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
function Home() {
  const context = useContext(NoteContext);
  const{notes,setnotes}=context;
  return (
    <div className='container'>
      
      <h1>Add Note</h1>
      <div className="container">
        <AddNote/>
      </div>

     
      <h1>Your Notes</h1>
      <div className='row my-3'>
  {notes.length === 0 && <p>No notes to display</p>}
        {notes.map((note, index) => (
          <div className="col-md-4" key={index}>
            <NoteItem key={note._id} note={note} />
          </div>
        ))}
    </div>
    </div>
  )
}

export default Home
