import { app, BrowserWindow } from "electron";
import * as path from "path";

function createWindow() {
    const window = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        }
    });
    window.loadFile('../index.html');
}

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