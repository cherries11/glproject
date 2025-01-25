const express = require("express");
const mysql = require("mysql2"); // Declare mysql once
const dotenv = require("dotenv").config(); // Load environment variables
const app = express();

const port = process.env.PORT || 5000;

// Middleware for parsing JSON
app.use(express.json());

// Import routes
app.use('/api/contacts', require("./routes/countactRoutes"));
app.use('/api/admin', require("./routes/adminRoutes"));


// Middleware for error handling
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,  // Send the error message in response
    stack: err.stack     // Optionally, include stack trace
  });
});

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "dz_beauty",
});


// Test MySQL connection and fetch tables
db.query("SHOW TABLES;", (err, results) => {
  if (err) {
    console.error("❌ Error fetching tables:", err.message);
  } else {
    console.log("✅ Tables in the database:", results);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// Export the MySQL pool
module.exports = db;
