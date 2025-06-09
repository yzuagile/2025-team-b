// src/components/NoteList.tsx
import React, { useState, useEffect, useMemo } from "react";
import NoteItem       from "./NoteItem";
import RenameModal    from "./RenameModal";
import AddLabelModal  from "./AddLabelModal";
import { useNotesContext } from "../context/NotesContext";
import "../style/NoteList.css";

// 單純存 id ↔ labels
type LabelsMap = Record<string, string[]>;

export default function NoteList() {
  const { notesMap, selected, selectNote, renameNote } = useNotesContext();

  // 取所有 note 的 labels，存成 { id: string[] }
  const [idLabels, setIdLabels] = useState<LabelsMap>({});
  const fetchLabels = async () => {
    const all = await window.noteAPI.getAllNotes();
    const m: LabelsMap = {};
    all.forEach(n => { m[n.note_id] = n.labels });
    setIdLabels(m);
  };
  useEffect(() => {
    fetchLabels();
  }, []);

  // Rename Modal 狀態 & 邏輯
  const [isRenaming, setIsRenaming]     = useState(false);
  const [renameValue, setRenameValue]   = useState("");
  const [renameTarget, setRenameTarget] = useState<string|null>(null);

  const openRename = (id: string, title: string) => {
    setRenameTarget(id);
    setRenameValue(title);
    setIsRenaming(true);
  };
  const cancelRename = () => {
    setIsRenaming(false);
    setRenameTarget(null);
  };
  const confirmRename = async () => {
    if (renameTarget && renameValue.trim()) {
      await renameNote(renameTarget, renameValue.trim());
      // notesMap 會更新，component 重新 render
    }
    cancelRename();
  };

  // Add Label Modal 狀態 & 邏輯
  const [isAdding, setIsAdding]       = useState(false);
  const [allLabels, setAllLabels]     = useState<string[]>([]);
  const [selLabels, setSelLabels]     = useState<string[]>([]);
  const [newLabel, setNewLabel]       = useState("");
  const [addTarget, setAddTarget]     = useState<string|null>(null);

  const openAddLabel = (id: string) => {
    setAddTarget(id);
    // 從 idLabels 針對所有 note 收集所有 labels
    const labels = Array.from(
      new Set(Object.values(idLabels).flat())
    );
    setAllLabels(labels);
    setSelLabels(idLabels[id] || []);
    setNewLabel("");
    setIsAdding(true);
  };
  const cancelAdd = () => {
    setIsAdding(false);
    setAddTarget(null);
  };
  const toggleLabel = (label: string) => {
    setSelLabels(prev =>
      prev.includes(label)
        ? prev.filter(l => l !== label)
        : [...prev, label]
    );
  };
  const handleAddNewLabel = () => {
    const v = newLabel.trim();
    if (v && !allLabels.includes(v)) {
      setAllLabels(prev => [...prev, v]);
      setSelLabels(prev => [...prev, v]);
    }
    setNewLabel("");
  };
  const confirmAdd = async () => {
    if (addTarget) {
      await window.noteAPI.updateLabels(addTarget, selLabels);
      await fetchLabels();   // 更新 labels map
    }
    cancelAdd();
  };

  const grouped = useMemo(() => {

    // 映射 label -> title （一個 label 可能有很多筆記）
    const groups: Record<string, string[]> = {
      Untagged: []
    };
    Object.entries(notesMap).forEach(([title, id]) => {
      const labels = idLabels[id] || [];
      if (labels.length) {
        labels.forEach(label => {
          if (!groups[label]) groups[label] = [];
          groups[label].push(title);
        });
      } else {
        groups.Untagged.push(title);
      }
    });

    // 各組內依 title 排序
    Object.values(groups).forEach(arr =>
      arr.sort((a, b) => a.localeCompare(b))
    );
    return groups;
  }, [notesMap, idLabels]);

  // label 顯示順序：先 Untagged，再其餘字母排序
  const labelOrder = useMemo(
    () => [
      "Untagged",
      ...Object.keys(grouped)
        .filter(l => l !== "Untagged")
        .sort(),
    ],
    [grouped]
  );

  return (
    <>
      {labelOrder.map(label =>
        grouped[label]?.length > 0 ? (
          <div key={label} className="note-group">
            <h3 className="note-group-title">
              {label === "Untagged" ? "未分類" : label}
            </h3>
            <ul className="tag-list">
              {grouped[label].map((title) => (
                <NoteItem
                  key={notesMap[title]}
                  id={notesMap[title]}
                  title={title}
                  selected={notesMap[title] === selected?.note_id}
                  onSelect={selectNote}
                  openRename={() => openRename(notesMap[title], title)}
                  openAddLabel={() => openAddLabel(notesMap[title])}
                />
              ))}
            </ul>
          </div>
        ) : null
      )}

      {/* 重命名 Modal */}
      <RenameModal
        isOpen={isRenaming}
        value={renameValue}
        onChange={setRenameValue}
        onCancel={cancelRename}
        onConfirm={confirmRename}
      />

      {/* 加標籤 Modal */}
      <AddLabelModal
        isOpen={isAdding}
        existingLabels={allLabels}
        selectedLabels={selLabels}
        onToggleLabel={toggleLabel}
        newLabel={newLabel}
        onNewLabelChange={setNewLabel}
        onAddNewLabel={handleAddNewLabel}
        onCancel={cancelAdd}
        onConfirm={confirmAdd}
      />
    </>
  );
}