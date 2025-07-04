import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2MjMwNjkzOGQwMmRjMWZiZThjY2NiIn0sImlhdCI6MTc1MTI3MTk0OH0.4MxJvaZLGasACtG6E093PR22rWTK-rvS8j0Fh30WfaQ"; // replace with your actual token or store securely

  const [notes, setNotes] = useState([]);

  // Fetch all notes
  const fetchNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      }
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      }
    });

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
      body: JSON.stringify({ title, description, tag })
    });

    const updatedNotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        fetchNotes,
        addNote,
        deleteNote,
        editNote
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
