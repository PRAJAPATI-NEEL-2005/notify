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
  return (
  <NoteContext.Provider value={{notes,setnotes}}>

{props.children}

  </NoteContext.Provider>
);}
export default NoteState;
