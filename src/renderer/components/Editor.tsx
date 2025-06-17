import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import { useNotesContext } from "../context/NotesContext";
import "../style/Editor.css";

export default function Editor() {
  const { selected, contextValue, setContextValue } = useNotesContext();
  const editorRef = useRef<any>(null);

  // Jodit 的設定，可以只留你要的按鈕
  const config = {
    readonly: !selected,
    toolbarAdaptive: false,
    toolbarSticky: false,
    showXPathInStatusbar: false,
    width: '100%',
    height: '100%',
    language: "zh_tw",
    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "brush",
      "paragraph",
      "|",
      "link",
      "image",
      "source",
      "|",
      "undo",
      "redo",
    ],
    uploader: { 
      url: 'connector/index.php?action=upload',
      insertImageAsBase64URI: true,
      imagesExtensions: ['jpg', 'png', 'jpeg', 'gif']
    }
  };

  return (
    <div className="editor-wrapper">
      <JoditEditor
        ref={editorRef}
        value={contextValue}
        config={config}
        onBlur={newContent => {
          // newContent 是編輯區的 HTML
          setContextValue(newContent);
          if (selected) {
            window.noteAPI.updateContext(selected.note_id, newContent);
          }
        }}
      />
    </div>
  );
}
