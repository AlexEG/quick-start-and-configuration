const sqlite3 = require("sqlite3").verbose();

function readDB(databaseFile) {
  let dbFile = new sqlite3.Database(
    `./db/${databaseFile}.db`,
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) return console.error(err.message);
      // console.info("[200] connecting to database");
    }
  );
  const getDataDB = `SELECT * FROM manga`;

  return dbFile.all(getDataDB, [], (err, rows) => {
    if (err) return console.error(err.message);
    // console.log("DB data has been reserved");
    return rows;
  });
}

function createDB(databaseFile) {
  let dbFile = new sqlite3.Database(
    `./db/${databaseFile}.db`,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) return console.error(err.message);
      console.info("[200] connecting to database");
    }
  );

  // const tableSchema = `CREATE TABLE anime(id,title,chapter,rank),manga(id,title,chapter,rank),charters(id,name)`;
  const tableSchema = `CREATE TABLE IF NOT EXISTS "main"."messages" ( "message_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
  "date_created" DATETIME DEFAULT CURRENT_TIMESTAMP,
  "user_id_created" INTEGER,
  "task_id" INTEGER,
  "message_value" VARCHAR );`;
  const tableSchema2 = `CREATE TABLE IF NOT EXISTS "main"."users" ( "user_id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
  "forename" VARCHAR,
  "surname" VARCHAR,
  "password" VARCHAR,
  "salt" VARCHAR );`;
  dbFile.run(tableSchema);
  dbFile.run(tableSchema2);
}

module.exports = { readDB, createDB };
