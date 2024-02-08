// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const sqlite3 = require("sqlite3").verbose();

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

  // ------------------ //

  function readDB() {
    let dbFile = new sqlite3.Database(
      "./db/manga.db",
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) return console.error(err.message);
        console.info("[200] connecting to test.db database");
      }
    );

    const getDataDB = `SELECT * FROM manga`;
    dbFile.all(getDataDB, [], (err, rows) => {
      if (err) return console.error(err.message);

      console.log("DB data has been reserved ");
      console.log(rows);
    });
  }

  // function createDB() {
  //   let animeDB = new sqlite3.Database(
  //     "db/manga.db",
  //     sqlite3.OPEN_READWRITE,
  //     (err) => {
  //       if (err) return console.error(err.message);
  //       console.info("[200] connecting to anime database");
  //     }
  //   );
  //   const animeSQL = `CREATE TABLE users(first_name,last_name,username,password,email)`;
  //   // animeDB.run(animeSQL);

  //   const addAnimeToDbSQL = `INSERT INTO users(first_name,last_name,username,password,email) VALUES (?,?,?,?,?)`;

  //   for (let i = 102; i <= 150; i++) {
  //     const addDataToAnimeDB = [
  //       "user" + i,
  //       "user-" + i,
  //       "User " + i,
  //       "password " + i,
  //       `user${i}@gmail.com`,
  //     ];

  //     animeDB.run(addAnimeToDbSQL, addDataToAnimeDB, (err) => {
  //       if (err) return console.error(err.message);
  //       console.info("animeDB: data has been added successfully");
  //     });
  //   }
  // }

  ipcMain.on("read-db", async (event, data) => {
    try {
      console.log("WE ARE IN BOYS");
      readDB();
    } catch (error) {
      console.error(error);
      console.log("not working!!!");
    }
  });

  // ------------------ //
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

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
