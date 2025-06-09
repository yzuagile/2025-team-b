import React, { useState, useRef, useEffect } from "react";
import { createPortal }       from "react-dom";
import "../style/NoteItem.css";

interface Props {
  id: string;
  title: string;
  selected: boolean;
  onSelect(id: string): void;
  openRename(): void;
  openAddLabel(): void;
}

export default function NoteItem({
  id,
  title,
  selected,
  onSelect,
  openRename,
  openAddLabel,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const btnRef  = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const openMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + window.scrollY,
        left: rect.left   + window.scrollX,
      });
    }
    setMenuOpen(true);
  };

  // 點擊外部時關閉 menu（同時考慮 btnRef & menuRef）
  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      const tgt = e.target as Node;
      if (
        menuRef.current?.contains(tgt) ||
        btnRef.current?.contains(tgt)
      ) return;
      setMenuOpen(false);
    };

    const handleFocusIn = (e: FocusEvent) => {
      const tgt = e.target as Node;
      if (
        menuRef.current?.contains(tgt) ||
        btnRef.current?.contains(tgt)
      ) return;
      setMenuOpen(false);
    };

    // capture phase → 最早攔截所有點擊 & focus
    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("focusin",  handleFocusIn,    true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("focusin",     handleFocusIn,    true);
    };
  }, [menuOpen]);

  return (
    <li
      className={`tag-item${selected ? " selected" : ""}`}
      onClick={() => onSelect(id)}
    >
      <span>{title}</span>
      <button
        ref={btnRef}
        className={`menu-btn${selected ? " selected" : ""}`}
        onClick={openMenu}
      >
        ＋
      </button>

      {menuOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="dropdown-menu"
            style={{
              position: "absolute",
              top:  pos.top,
              left: pos.left,
              zIndex: 9999,
            }}
          >
            <button
              onClick={() => {
                openRename();
                setMenuOpen(false);
              }}
            >
              重新命名標題
            </button>
            <button
              onClick={() => {
                openAddLabel();
                setMenuOpen(false);
              }}
            >
              加入標籤
            </button>
          </div>,
          document.body
        )}
    </li>
  );
}