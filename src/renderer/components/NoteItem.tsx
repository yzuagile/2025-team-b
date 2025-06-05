import React, { useState, useRef, useEffect } from "react";
import "../style/NoteItem.css";

interface Props {
  id: string;
  title: string;
  selected: boolean;
  onSelect(id: string): void;
  openRename(): void;
}

export default function NoteItem({ id, title, selected, onSelect, openRename }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  // 點擊 + 號
  function toggle(e: React.MouseEvent) {
    e.stopPropagation();
    setMenuOpen(true);
  }

  // 點擊外部關閉
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  return (
    <li
      ref={ref}
      className={`tag-item${selected ? " selected" : ""}`}
      onClick={() => onSelect(id)}
    >
      <span>{title}</span>
      <button className={`menu-btn${selected ? " selected" : ""}`} onClick={toggle}>＋</button>
      {menuOpen && (
        <div className="dropdown-menu">
          <button onClick={openRename}>
            重新命名標題
          </button>
          <button onClick={() => setMenuOpen(false)}>
            加入標籤
          </button>
        </div>
      )}
    </li>
  );
}