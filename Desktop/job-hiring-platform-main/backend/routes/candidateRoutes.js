const express = require("express");
const router = express.Router();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// ✅ Get all candidates
router.get("/candidates", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM applications");
    console.log("Fetched applications:", rows); // Debugging
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching candidates:", err);
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
});

// ✅ Get total candidate count
router.get("/candidates/count", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS count FROM applications"
    );
    res.json({ count: rows[0].count });
  } catch (err) {
    console.error("❌ Error fetching candidate count:", err);
    res.status(500).json({ error: "Failed to fetch candidate count" });
  }
});

// ✅ Get candidate by ID
router.get("/candidate/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM applications WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Candidate not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error fetching candidate:", err);
    res.status(500).json({ error: "Failed to fetch candidate" });
  }
});

module.exports = router;
