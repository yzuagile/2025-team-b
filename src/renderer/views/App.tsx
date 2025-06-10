import React from "react";
import { useNotes } from "../hooks/useNotes";
import Editor from "../components/Editor";
import Sidebar from "../components/SideBar";
import "../style/App.css";

export default function App() {
  return (
    <div className="notion-app">
      <Sidebar />
      <Editor />
    </div>
  );
}