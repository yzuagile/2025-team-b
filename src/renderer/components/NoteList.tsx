import React from "react";
import NoteItem from "./NoteItem";
import "../style/NoteList.css"

interface Props {
  notesMap: Record<string, string>;
  selectedId?: string;
  onSelect: (id: string) => void;
  onRename: (id: string) => void;
}

export default function NoteList({ notesMap, selectedId, onSelect, onRename }: Props) {
  return (
    <>
      <ul className="tag-list">
        {Object.entries(notesMap).map(([title, id]) => (
          <NoteItem
            key={id}
            id={id}
            title={title}
            selected={id === selectedId}
            onSelect={onSelect}
            onRename={onRename}
          />
        ))}
      </ul>

    </>

  );
}