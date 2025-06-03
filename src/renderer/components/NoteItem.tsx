import React, { useState, useRef, useEffect } from "react";
import "../style/NoteItem.css";

interface Props {
  id: string;
  title: string;
  selected: boolean;
  onSelect: (id: string) => void;
  //onRename: (id: string, newTitle:string) => void;
}

export default function NoteItem({ id, title, selected, onSelect}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const liRef = useRef<HTMLLIElement>(null);

  // 點擊 + 號
  function toggleMenu(e: React.MouseEvent) {
    e.stopPropagation();   // 阻止事件冒泡，以免被 click-outside 捕捉到
    setMenuOpen((o) => !o);
  }

  // 點擊外部時自動關閉
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        liRef.current &&
        !liRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <li
      ref={liRef}
      className={`tag-item${selected ? " selected" : ""}`}
      onClick={() => onSelect(id)}
    >
      <span>{title}</span>
      <button className="menu-btn" onClick={toggleMenu}>
        +
      </button>

      {menuOpen && (
        <div className="dropdown-menu">
          <button
            onClick={() => {
              setMenuOpen(false);
              /* TODO: open rename modal */
              
            }}
          >
            重新命名標題
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              /* TODO: open add-label modal */
            }}
          >
            加入標籤
          </button>
        </div>
      )}
    </li>
  );
}