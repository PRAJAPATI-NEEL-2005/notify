import React, { useContext } from 'react'

import NoteContext from '../context/notes/noteContext'
function About() {
  const a=useContext(NoteContext)
  return (
    <div>
      that is about {a.name}
    </div>
  )
}

export default About
