const express = require("express");
const router = express.Router();
const db = require("../server"); // MySQL connection

// Route to filter workers (prestataires) based on category and other criteria
router.get("/filter-prestataires", (req, res) => {
  const { category_id, name } = req.query; // Extract category and name from query params

  let query = "SELECT * FROM workers WHERE 1=1"; // Basic query to start filtering
  const values = [];

  if (category_id) {
    query += " AND category_id = ?";
    values.push(category_id); // Filter by category
  }

  if (name) {
    query += " AND name LIKE ?";
    values.push(`%${name}%`); // Filter by name (partial matching)
  }

  // Execute the query
  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error filtering workers:", err.message);
      return res.status(500).json({ message: "Error filtering workers" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No workers found with the given criteria." });
    }

    res.status(200).json({ workers: results });
  });
});

module.exports = router;
