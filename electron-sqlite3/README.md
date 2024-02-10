# Electron + SQLite3 (JS)

#### Step 1: install sqlite3 and rebuild for electron

1. install sqlite3 `npm i sqlite3`
2. install electron-rebuild `npm install --save-dev @electron/rebuild`
3. add script in package.json called `rebuild` with script of `electron-rebuild -f -w sqlite3`
4. and then run `npm run rebuild`

```json
// example code
{
  "name": "electron-sqlite3",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "rebuild": "electron-rebuild -f -w sqlite3"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "electron": "^28.2.1",
    "electron-rebuild": "^3.2.9"
  },
  "dependencies": {
    "sqlite3": "^5.1.7"
  }
}
```

---

#### Step 2: Inter-Process Communication

create database file with table

```js
function createDB(databaseFile) {
  let dbFile = new sqlite3.Database(
    `./db/${databaseFile}.db`,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) return console.error(err.message);
      console.info("[200] connecting to database");
    }
  );

  const tableSchema = `CREATE TABLE users(first_name,last_name,username,password,email)`;
  dbFile.run(tableSchema);
}
```

sqlite3 create multiple table

```js
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
```
