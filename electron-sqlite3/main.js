// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const sqlite3 = require("sqlite3").verbose();
const { readDB, createDB } = require("./ipc/db");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // ------------------ //
  const CHANNEL_NAME = "read-db";
  const MESSAGE = "return from IPC channel from main.js";

  // ipcMain.on(CHANNEL_NAME, async (event, databaseFile) => {
  //   try {
  //     let dbFile = new sqlite3.Database(
  //       `./db/${databaseFile}.db`,
  //       sqlite3.OPEN_READWRITE,
  //       (err) => {
  //         if (err) return console.error(err.message);
  //         // console.info("[200] connecting to database");
  //       }
  //     );
  //     const getDataDB = `SELECT * FROM manga`;

  //     dbFile.all(getDataDB, [], (err, rows) => {
  //       if (err) return console.error(err.message);
  //       // console.log("DB data has been reserved");
  //       event.returnValue = rows;
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     console.log("not working!!!");
  //   }
  // });

  // ipcMain.on("create-db", async (event, databaseFile) => {
  //   try {
  //     createDB(databaseFile);
  //   } catch (error) {
  //     console.error(error);
  //     console.log("not working!!!");
  //   }
  // });

  ipcMain.on("insert-db", async (event, databaseFile, addData) => {
    try {
      let dbFile = new sqlite3.Database(
        `./db/${databaseFile}.db`,
        sqlite3.OPEN_READWRITE,
        (err) => {
          if (err) return console.error(err.message);
        }
      );
      const addAnimeToDbSQL = `INSERT INTO manga(title,rank,chapters,volumes) VALUES (?,?,?,?)`;

      dbFile.run(addAnimeToDbSQL, addData, (err) => {
        if (err) return console.error(err.message);
        console.info("data has been added successfully");
      });
    } catch (error) {
      console.error(error);
      console.log("not working!!!");
    }
  });

  // ------------------ //

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
