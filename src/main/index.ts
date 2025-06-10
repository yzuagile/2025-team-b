import { app, BrowserWindow, ipcMain} from "electron";
import * as path from "path";
import { createNote } from "../backend/model/create";
import { getAllNotes,  getNote } from "../backend/model/get";
import { idExist } from "../backend/model/find";
import {
  updateTimeStamp,
  updateNote,
  updateTitle,
  updateLabels,
  updateContext,
} from "../backend/model/update";

app.commandLine.appendSwitch('remote-debugging-port', '9222');
const isDev = process.env.NODE_ENV === 'development';
const rendererURL = 'http://localhost:3000';

function createWindow() {
    const window = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, "../preload/preload.js"),
            contextIsolation: true
        }
    });

    if (isDev) {
        window.loadURL(rendererURL);
        window.webContents.openDevTools();
      } else {
        window.loadFile(path.join(__dirname, '../renderer/index.html'));
      }
    
      //window.loadFile('../index.html');
}

// ——— IPC Handlers ———
// create
ipcMain.handle(
  "notes:createNote",
  async (_, title: string, labels: string[], content: string) =>
    createNote(title, labels, content)
);

// getAll
ipcMain.handle("notes:getAllNotes", async () => getAllNotes());

// get one
ipcMain.handle("notes:getNote", async (_, id: string) => getNote(id));

// find
ipcMain.handle("notes:idExist", async (_, id: string) => idExist(id));

// update
ipcMain.handle("notes:updateTimeStamp", async (_, id: string) =>
  updateTimeStamp(id)
);
ipcMain.handle(
  "notes:updateNote",
  async (_, id: string, note: Note) => updateNote(id, note)
);
ipcMain.handle("notes:updateTitle", async (_, id: string, t: string) =>
  updateTitle(id, t)
);
ipcMain.handle("notes:updateLabels", async (_, id: string, labels: string[]) =>
  updateLabels(id, labels)
);
ipcMain.handle("notes:updateContext", async (_, id: string, ctx: string) =>
  updateContext(id, ctx)
);

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });
});

app.on('window-all-closed', () => {
    // To implement this, listen for the app module's 'window-all-closed' event, 
    // and call app.quit() if the user is not on macOS (darwin).
    if (process.platform !== 'darwin') app.quit();
});