const { contextBridge, ipcRenderer } = require("electron");

// ipcRenderer.send("read-db", "manga");
// ipcRenderer.send("create-db", "anilist14");

contextBridge.exposeInMainWorld("electronAPI", {
  createDatabaseFile: (databaseFile) =>
    ipcRenderer.send("create-db", databaseFile),
  readDatabaseFile: (databaseFile) => ipcRenderer.send("read-db", databaseFile),
});

const CHANNEL_NAME = "read-db";
const MESSAGE = "manga";

console.log(ipcRenderer.sendSync(CHANNEL_NAME, MESSAGE));
