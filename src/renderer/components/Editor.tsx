import React from "react";
import "../style/Editor.css"

interface Props {
  title?: string;
  context: string;
  onChange: (v:string) => void;
}

export default function Editor({ title, context, onChange }: Props) {
  return (
    <div className="editor">
      <textarea
        className="editor-area"
        placeholder="請輸入筆記內容..."
        value={context}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}