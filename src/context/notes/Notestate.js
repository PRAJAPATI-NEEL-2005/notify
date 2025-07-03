import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const initialNotes=[
  {
    "_id": "68628474e3baa989e74c76b6",
    "user": "6862306938d02dc1fbe8cccb",
    "title": "hello",
    "description": "that is my first note",
    "tag": "user",
    "date": "2025-06-30T12:35:00.608Z",
    "__v": 0
  },
    {
    "_id": "68628474e3baa989e74c76b6",
    "user": "6862306938d02dc1fbe8cccb",
    "title": "hello",
    "description": "that is my first note",
    "tag": "user",
    "date": "2025-06-30T12:35:00.608Z",
    "__v": 0
  },
    {
    "_id": "68628474e3baa989e74c76b6",
    "user": "6862306938d02dc1fbe8cccb",
    "title": "hello",
    "description": "that is my first note",
    "tag": "user",
    "date": "2025-06-30T12:35:00.608Z",
    "__v": 0
  },
    {
    "_id": "68628474e3baa989e74c76b6",
    "user": "6862306938d02dc1fbe8cccb",
    "title": "hello",
    "description": "that is my first note",
    "tag": "user",
    "date": "2025-06-30T12:35:00.608Z",
    "__v": 0
  },
    {
    "_id": "68628474e3baa989e74c76b6",
    "user": "6862306938d02dc1fbe8cccb",
    "title": "hello",
    "description": "that is my first note",
    "tag": "user",
    "date": "2025-06-30T12:35:00.608Z",
    "__v": 0
  },
    {
    "_id": "68628474e3baa989e74c76b6",
    "user": "6862306938d02dc1fbe8cccb",
    "title": "hello",
    "description": "that is my first note",
    "tag": "user",
    "date": "2025-06-30T12:35:00.608Z",
    "__v": 0
  }
]
const [notes, setnotes] = useState(initialNotes);
  const addNote = (title, description, tag) => {
    const newNote = {
      _id: Date.now().toString(), // using timestamp as ID for now
      user: "dummy-user-id",
      title,
      description,
      tag,
      date: new Date().toISOString(),
      __v: 0
    };
    setnotes([...notes, newNote]);
  };


  return (
  <NoteContext.Provider value={{notes,setnotes,addNote}}>

{props.children}

  </NoteContext.Provider>
);}
export default NoteState;
