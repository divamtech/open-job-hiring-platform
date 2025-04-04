// routes/admin.js
const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../../../backend/config/db");

const router = express.Router();

// Admin login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM admins WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const admin = results[0];

    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      res.json({ message: "Login successful", admin });
    });
  });
});

module.exports = router;
