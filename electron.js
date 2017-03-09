const electron = require("electron");
require("./server/index.js");

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
//app.disableHardwareAcceleration();

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
