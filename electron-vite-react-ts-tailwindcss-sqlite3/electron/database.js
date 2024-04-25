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
}
