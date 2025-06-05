import React, { createContext, useContext } from "react";
import { useNotes} from "../hooks/useNotes";

interface NotesContextType {
  notesMap: Record<string,string>;
  selected?: Note;
  contextValue: string;
  setContextValue(v: string): void;
  selectNote(id: string): Promise<void>;
  createNote(title: string): Promise<void>;
  renameNote(id: string, newTitle: string): Promise<void>;
}

const NotesContext = createContext<NotesContextType|undefined>(undefined);

export const NotesProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { notesMap, selected, contextValue, setContextValue, selectNote, createNote, renameNote } = useNotes();
  return (
    <NotesContext.Provider value={{ notesMap, selected, contextValue, setContextValue, selectNote, createNote, renameNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export function useNotesContext(): NotesContextType {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotesContext must be used within NotesProvider");
  return ctx;
}