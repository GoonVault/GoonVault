import sqlite3 from "sqlite3";
import path from "path";

// Enable verbose mode for better debugging
sqlite3.verbose();

// Path to the SQLite database file
const dbPath = path.resolve(__dirname, "../database.sqlite"); // This is the existing database file in your GV-Server directory

// Create a database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Could not connect to database", err);
  } else {
    console.log("Connected to SQLite database at", dbPath);
  }
});

export default db;
