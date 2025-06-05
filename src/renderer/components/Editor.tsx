import React from "react";
import { useNotesContext } from "../context/NotesContext";
import "../style/Editor.css";

export default function Editor() {
  const { selected, contextValue, setContextValue } = useNotesContext();

  return (
    <div className="editor">
      <textarea
        className="editor-area"
        placeholder="請輸入筆記內容..."
        value={contextValue}
        onChange={e => setContextValue(e.target.value)}
        disabled={!selected}
      />
    </div>
  );
}