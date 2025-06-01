import React from "react";
import { useNotes } from "../hooks/useNotes";
import Editor from "../components/Editor";
import Sidebar from "../components/SideBar";
import "../style/App.css";

export default function App() {
  const {
    notesMap,
    selected,
    contextValue,
    setContextValue,
    selectNote,
    createNote,
  } = useNotes();

  return (
    <div className="notion-app">
      <Sidebar
        notesMap={notesMap}
        selectedId={selected?.note_id}
        onSelect={selectNote}
        onCreate={createNote}
      />
      <Editor
        title={selected?.title}
        context={contextValue}
        onChange={setContextValue}
      />
    </div>
  );
}