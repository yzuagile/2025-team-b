import React from "react";
import AddNoteButton from "./AddNoteButton";
import NoteList from "./NoteList";
import "../style/SideBar.css"

interface SidebarProps {
  notesMap: Record<string, string>;
  selectedId?: string;
  onSelect: (id: string) => void;
  onCreate: (title: string) => Promise<void>;
}

export default function Sidebar({
  notesMap,
  selectedId,
  onSelect,
  onCreate,
}: SidebarProps) {
  return (
    <div className="sidebar">
      {/* 新增筆記按鈕 */}
      <AddNoteButton onCreate={onCreate} />

      {/* 筆記清單 */}
      <NoteList
        notesMap={notesMap}
        selectedId={selectedId}
        onSelect={onSelect}
      />
    </div>
  );
}