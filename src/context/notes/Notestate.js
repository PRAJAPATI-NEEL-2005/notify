import React, { useState , useContext} from "react";
import NoteContext from "./noteContext";
import AuthContext from "../authentication/authContext";

const NoteState = (props) => {
  const {token, isAuthenticated} = useContext(AuthContext)
  const host = process.env.REACT_APP_BACKEND_SERVER;
  const authToken = token; // replace with your actual token or store securely

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

 const addNote = async (title, description, tag) => {
  try {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
      body: JSON.stringify({ title, description, tag })
    });

    if (!response.ok) return false; // handle non-200 responses

    const note = await response.json();
    setNotes(notes.concat(note));
    return true;
  } catch (error) {
    console.error("Add note failed:", error);
    return false;
  }
};

const deleteNote = async (id) => {
  try {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      }
    });

    if (!response.ok) return false;

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
    return true;
  } catch (error) {
    console.error("Delete note failed:", error);
    return false;
  }
};

const editNote = async (id, title, description, tag) => {
  try {
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
      body: JSON.stringify({ title, description, tag })
    });

    if (!response.ok) return false;

    const updatedNotes = notes.map((note) =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(updatedNotes);
    return true;
  } catch (error) {
    console.error("Edit note failed:", error);
    return false;
  }
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
