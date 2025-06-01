import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("noteAPI", {
  createNote: (title: string, labels: string[], content: string) =>
    ipcRenderer.invoke("notes:createNote", title, labels, content),
  getAllNotes: () => ipcRenderer.invoke("notes:getAllNotes"),
  getNote: (id: string) => ipcRenderer.invoke("notes:getNote", id),
  isExists: (id: string) => ipcRenderer.invoke("notes:idExist", id),
  updateTimeStamp: (id: string) =>
    ipcRenderer.invoke("notes:updateTimeStamp", id),
  updateNote: (id: string, note: Note) =>
    ipcRenderer.invoke("notes:updateNote", id, note),
  updateTitle: (id: string, title: string) =>
    ipcRenderer.invoke("notes:updateTitle", id, title),
  updateLabels: (id: string, labels: string[]) =>
    ipcRenderer.invoke("notes:updateLabels", id, labels),
  updateContext: (id: string, ctx: string) =>
    ipcRenderer.invoke("notes:updateContext", id, ctx),
});

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector: string, text: string) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
});