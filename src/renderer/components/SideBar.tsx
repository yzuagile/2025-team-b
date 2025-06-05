import React from "react";
import AddNoteButton from "./AddNoteButton";
import NoteList from "./NoteList";
import { useNotesContext } from "../context/NotesContext";

import "../style/SideBar.css"
export default function Sidebar() {
  const { createNote } = useNotesContext();

  return (
    <div className="sidebar">
      <AddNoteButton onCreate={createNote} />
      <NoteList />
    </div>
  );
}