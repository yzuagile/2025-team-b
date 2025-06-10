import { useState, useEffect } from "react";

export function useNotes() {

  // map title => id
  let [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<Note | undefined>(undefined);
  const [contextValue, setContextValue] = useState("");

  //  載入列表
  useEffect(() => {
    window.noteAPI.getAllNotes().then((all) => {
      setNotesMap(Object.fromEntries(all.map(n => [n.title, n.note_id])));
    });
  }, []);

  //  視窗關閉前儲存
  useEffect(() => {
    const beforeUnload = async () => {
      if (selected) {
        await window.noteAPI.updateContext(selected.note_id, contextValue);
      }
    };
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [selected, contextValue]);

  //  切換筆記
  async function selectNote(id: string) {
    if (selected) {
      await window.noteAPI.updateContext(selected.note_id, contextValue);
    }
    const note = await window.noteAPI.getNote(id);
    setSelected(note);
    setContextValue(note?.context || "");
  }

  //  新增筆記
  async function createNote(title: string) {
    const id = await window.noteAPI.createNote(title, [], "");
    if (!id) return;
    setNotesMap(m => ({ ...m, [title]: id }));
    await selectNote(id);
  }

  // 重新命名筆記
  async function renameNote(id: string, newTitle: string) {
    await window.noteAPI.updateTitle(id, newTitle);
    setNotesMap(prev => {
    // 1. 找到舊 title
    const oldTitle = Object.entries(prev)
      .find(([, noteId]) => noteId === id)?.[0];

    const { [oldTitle]: _, ...rest } = prev;

    return {
      ...rest,
      [newTitle]: id,
    };
  });

  }

  return {
    notesMap,
    selected,
    contextValue,
    setContextValue,
    selectNote,
    createNote,
    renameNote
  };
}