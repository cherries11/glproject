// db.js
import Database from 'better-sqlite3';

// Specify the path for the SQLite database
const dbPath = './db/database.sqlite';

// Initialize SQLite database
const db = new Database(dbPath, { verbose: console.log }); // Optional logging for debugging

// Export the db object to be used in other files
export default db;

