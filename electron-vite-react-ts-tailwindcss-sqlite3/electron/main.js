import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now you can use __dirname as you would in a CommonJS module

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, "preload.js"), // use a preload script
    },
  });

  win.loadURL("http://localhost:5173/");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("channel", (event, data) => {
  console.log(data); // logs the data sent from the renderer process
});

// Database

import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function openDb() {
  console.log("openDb");
  return open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });
}

export async function createTable() {
  console.log("createTable");

  const db = await openDb();
  await db.run(`CREATE TABLE IF NOT EXISTS greetings(message text)`);
}

export async function insertData(message) {
  console.log("insertData");

  const db = await openDb();
  await db.run(`INSERT INTO greetings(message) VALUES(?)`, message);
}

export async function readData() {
  console.log("readData");

  const db = await openDb();
  const rows = await db.all(`SELECT message FROM greetings`);
  rows.forEach((row) => {
    console.log(row.message);
  });
  return rows;
}

// for testing
// await createTable();
// await insertData("Hello, World!");
// await readData();

ipcMain.handle("create-table", async () => {
  await createTable();
});

ipcMain.handle("insert-data", async (event, message) => {
  await insertData(message);
});

ipcMain.handle("read-data", async () => {
  const data = await readData();
  return data;
});
