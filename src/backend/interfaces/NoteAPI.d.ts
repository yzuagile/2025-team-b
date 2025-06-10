export {};

interface NoteAPI {
  createNote: (title: string, labels: string[], content: string) => Promise<string>;
  getAllNotes: () => Promise<Note[]>;
  getNote: (id: string) => Promise<Note>;
  isExists: (id: string) => Promise<boolean>;
  updateTimeStamp: (id: string) => Promise<boolean>;
  updateNote: (id: string, note: Note) => Promise<boolean>;
  updateTitle: (id: string, title: string) => Promise<boolean>;
  updateLabels: (id: string, labels: string[]) => Promise<boolean>;
  updateContext: (id: string, ctx: string) => Promise<boolean>;
}

declare global {
  interface Window {
    noteAPI: NoteAPI;
  }
}