import React from "react";
import { createRoot } from "react-dom/client";
import App from "./views/App";
import { NotesProvider } from "./context/NotesContext";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Cannot find #root element");
}
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  </React.StrictMode>
);
