"use strict";var electron = require("electron");
require("./server/index.js");

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

var mainWindow = void 0;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false });

  mainWindow.loadURL("http://localhost:9000");
}

app.on("ready", createWindow);
