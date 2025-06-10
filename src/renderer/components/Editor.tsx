import React, { createRef, useState } from "react";
import { useNotesContext } from "../context/NotesContext";
import "../style/Editor.css";
import { TextMode } from "../modes/TextMode";
import { BoldMode } from "../modes/BoldMode";
import { ItalicMode } from "../modes/ItalicMode";
import { OrderListMode } from "../modes/OrderListMode";
import { UnorderListMode } from "../modes/UnorderListMode";

type ModeType = "bold" | "italic" | "ol" | "ul" | null;

export default function Editor() {

  const { selected, contextValue, setContextValue } = useNotesContext();
  const [activeBtn, setActiveBtn] = useState<ModeType>(null);

  let textareaRef = createRef<HTMLTextAreaElement>();

  async function perform(textMode: TextMode, modeName:ModeType) {

    setActiveBtn(modeName);
    textMode.setValue(contextValue);
    const value = textMode.actionPerform(textareaRef.current.selectionStart, textareaRef.current.selectionEnd);
    
    if(!value){
      console.log("value is undefine");
      return;
    }

    console.log(value);
    setContextValue(value);
    console.log(selected);
    console.log(contextValue);
    await window.noteAPI.updateContext(selected.note_id, contextValue);
    
  }

  return (
    <div className="editor">
      <div className="toolbar">
        <button
          className={activeBtn === "bold" ? "active" : ""}
          onClick={() => perform(new BoldMode(), "bold")}
        >
          B
        </button>
        <button
          className={activeBtn === "italic" ? "active" : ""}
          onClick={() => perform(new ItalicMode(), "italic")}
        >
          I
        </button>
        <button
          className={activeBtn === "ol" ? "active" : ""}
          onClick={() => perform(new OrderListMode(), "ol")}
        >
          OL
        </button>
        <button
          className={activeBtn === "ul" ? "active" : ""}
          onClick={() => perform(new UnorderListMode(), "ul")}
        >
            UL
        </button>
      </div>
      <textarea
        ref={textareaRef}
        className="editor-area"
        placeholder="請輸入筆記內容..."
        value={contextValue}
        onChange={e => setContextValue(e.target.value)}
        disabled={!selected}
      />
    </div>
  );
}