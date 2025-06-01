import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../style/AddNoteButton.css"

interface Props {
  onCreate: (title: string) => Promise<void>;
}

Modal.setAppElement("#root");

export default function AddNoteButton({ onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("untitled");

  useEffect(() => {
    if (open) setTitle("untitled");
  }, [open]);

  return (
    <>
      <button className="sidebar-title" onClick={() => setOpen(true)}>
        新增筆記
      </button>
      <Modal isOpen={open} onRequestClose={() => setOpen(false)}>
        <h2>請輸入標題</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="untitled"
        />
        <div>
          <button onClick={() => setOpen(false)}>取消</button>
          <button
            onClick={async () => {
              await onCreate(title.trim());
              setOpen(false);
            }}
          >
            建立
          </button>
        </div>
      </Modal>
    </>
  );
}