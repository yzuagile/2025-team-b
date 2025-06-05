import React, { useState } from "react";
import NoteItem from "./NoteItem";
import RenameModal from "./RenameModal";
import { useNotesContext } from "../context/NotesContext";
import "../style/NoteList.css";

export default function NoteList() {
  const { notesMap, selected, selectNote, renameNote } = useNotesContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState("");
  const [targetId, setTargetId] = useState<string | null>(null);

  function openRename(id: string, title: string) {
    setTargetId(id);
    setValue(title);
    setIsOpen(true);
  }
  function cancel() {
    setIsOpen(false);
    setTargetId(null);
  }
  async function handleConfirm() {
    if (targetId && value.trim()) {
      await renameNote(targetId, value.trim());
    }
    setIsOpen(false);
    setTargetId(null);
  }

  return (
    <>
      <ul className="tag-list">
        {Object.entries(notesMap).sort(
          ([titleA], [titleB]) =>
            titleA.localeCompare(titleB)
        ).map(([title, id]) => (
          <NoteItem
            key={id}
            id={id}
            title={title}
            selected={id === selected?.note_id}
            onSelect={selectNote}
            openRename={() => openRename(id, title)}
          />
        ))}
      </ul>

      <RenameModal
        isOpen={isOpen}
        value={value}
        onChange={setValue}
        onCancel={cancel}
        onConfirm={handleConfirm}
      />
    </>
  );
}