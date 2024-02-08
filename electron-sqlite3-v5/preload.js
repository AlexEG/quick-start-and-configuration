const { ipcRenderer } = require("electron");

ipcRenderer.send("read-db");
