import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../style/App.css";

interface AddNoteButtonProps {
  onCreate: (title: string, labels: string[], content: string) => Promise<void>;
}

function handleSelect(note_id: string) { }

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

  // 載入所有筆記
  useEffect(() => {
    window.noteAPI.getAllNotes().then((all) => {
      const map = Object.fromEntries(
        all.map((n) => [n.title, n.note_id] as [string, string])
      );
      setNotes(map);
    });
  }, []);

  async function handleCreateNote(
    title: string,
    label: string[],
    content: string
  ) {
    let newId = await window.noteAPI.createNote(title, label, content);
    if (!newId) return;

    const note: Note = await window.noteAPI.getNote(newId);
    setNotes((prev) => ({
      ...prev,
      [note.title]: note.note_id,
    }));
  }

  return (
    <>
      <div className="notion-app">
        {/* 左側欄 */}
        <div className="sidebar">
          <AddNoteButton onCreate={handleCreateNote}></AddNoteButton>
          <ul className="tag-list">
            {Object.entries(notes).map(([title, id]) => (
              <li key={title} className="tag-item" onClick={() => handleSelect(id)}>
                {title}
              </li>
            ))}
          </ul>
        </div>
        {/* 編輯區 */}
        <div className="editor">
          <div className="editor-title"></div>
          <textarea className="editor-area" placeholder="請輸入筆記內容..." />
        </div>
      </div>
    </>
  );
}
