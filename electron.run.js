"use strict";var _electron = require("electron");var _electron2 = _interopRequireDefault(_electron);
require("./server/index.js");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var app = _electron2.default.app;
var BrowserWindow = _electron2.default.BrowserWindow;

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
