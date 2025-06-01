import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../style/App.css";

interface AddNoteButtonProps {
  onCreate: (title: string, labels: string[], content: string) => Promise<void>;
}

Modal.setAppElement("#root");

function AddNoteButton({ onCreate }: AddNoteButtonProps) {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("untitled");

  // 每次開 Modal 就重置欄位
  useEffect(() => {
    if (modalIsOpen) {
      setTitle("untitled");
    }
  }, [modalIsOpen]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function onModalConfirm() {
    await onCreate(title.trim(), [], "");
    closeModal();
  }

  return (
    <div>
      <button className="sidebar-title" onClick={openModal}>新增筆記</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        <h2>請輸入標題</h2>
        <input type="text" value={title} placeholder="untitled" onChange={(e) => setTitle(e.target.value)}></input>
        <div>
          <button onClick={closeModal}>取消</button>
          <button onClick={onModalConfirm}>建立</button>
        </div>
      </Modal>
    </div>
  )
}

export default function App() {

  const [notes, setNotes] = useState<Record<string, string>>({});
  const [selectedNote, setSelected] = useState<Note>(undefined);
  const [contextValue, setContextValue] = useState("");

  // 載入所有筆記
  useEffect(() => {
    window.noteAPI.getAllNotes().then((all) => {
      const map = Object.fromEntries(
        all.map((n) => [n.title, n.note_id] as [string, string])
      );
      setNotes(map);
    });
  }, []);

  // 在 App 關閉時可以把變更的內容儲存
  useEffect(() => {

    const beforeUnload = async () => {
      if (selectedNote) {
        await window.noteAPI.updateContext(
          selectedNote.note_id,
          contextValue
        );
      }
    };

    // effect 執行時（mount 或 deps 變更後），把 listener 加到 window
    window.addEventListener("beforeunload", beforeUnload);

    // cleanup：在下一次 effect 之前，或 component unmount 時，把 listener 移除
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [selectedNote]);

  async function handleCreateNote(
    title: string,
    label: string[],
    content: string
  ) {

    let newId = await window.noteAPI.createNote(title, label, content);
    if (!newId) return;

    setNotes((prev) => ({
      ...prev,
      [title]: newId,
    }));
    await handleSelect(newId);
  }

  async function handleSelect(uuid: string) {

    // 先把舊的編輯內容儲存
    if (selectedNote) {
      await window.noteAPI.updateContext(selectedNote.note_id, contextValue);
    }

    // 載入新的
    const note = await window.noteAPI.getNote(uuid);
    setSelected(note);
    setContextValue(note.context || "");
  }

  async function handleEditorChange(context: string) {
    setContextValue(context);
  }
  return (
    <>
      <div className="notion-app">
        {/* 左側欄 */}
        <div className="sidebar">
          <AddNoteButton onCreate={handleCreateNote}></AddNoteButton>
          <ul className="tag-list">
            {Object.entries(notes).map(([title, id]) => (
              <li key={title} className={`tag-item${id === selectedNote?.note_id ? " selected" : ""}`} onClick={() => handleSelect(id)}>
                {title}
              </li>
            ))}
          </ul>
        </div>
        {/* 編輯區 */}
        <div className="editor">
          <div className="editor-title"></div>
          <textarea 
            className="editor-area" 
            placeholder="請輸入筆記內容..." 
            value={contextValue}
            onChange={(e) => handleEditorChange(e.target.value)} 
          />
        </div>
      </div>
    </>
  );
}
