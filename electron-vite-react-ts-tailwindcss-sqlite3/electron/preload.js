const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  send: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
  receive: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});

console.log("From preload");

async function performDatabaseOperations() {
  console.log("running for preload.js");

  await ipcRenderer.invoke("create-table");
  await ipcRenderer.invoke("insert-data", "Hello, World!");
  const data = await ipcRenderer.invoke("read-data");
  console.log("data:", data);
}

performDatabaseOperations();
