const express = require("express");
const router = express.Router();
const { generateOfferCode } = require("../offre"); // Utility for generating codes
const db = require("../server"); // MySQL connection

// Route to add a new offer
router.post("/add-offer", (req, res) => {
  const { title, description, image_url } = req.body;


  // Validate required fields
  if (!title || !description || !image_url) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const offerCode = generateOfferCode(); // Generate a random code
  const query = `INSERT INTO offers (title, description, image_url, code) VALUES (?, ?, ?, ?)`;
  const values = [title, description, image_url, offerCode];

  // Use the connection pool's query method to insert the offer into the database
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error saving offer:", err.message);
      return res.status(500).json({ message: "Error saving offer" });
    }
    res.status(201).json({
      message: "Offer added successfully",
      offer: { title, description, image_url, code: offerCode },
    });
  });
});

// Route to get all offers

router.get("/get-offers", (req, res) => {
  const query = "SELECT * FROM offers";

  // Check if db is initialized
  if (!db || !db.query) {
    console.error("Database connection is not initialized.");
    return res.status(500).json({
      message: "Database connection is not initialized.",
    });
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving offers:", err.message);
      return res.status(500).json({ message: "Error retrieving offers" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No offers found." });
    }

    res.status(200).json({ offers: results });
  });
});
module.exports = router;
