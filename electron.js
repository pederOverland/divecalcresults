import electron from "electron";
import "./server/index.js";

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false
  });
  mainWindow.loadURL("http://localhost:9000");
}

app.on("ready", createWindow);
