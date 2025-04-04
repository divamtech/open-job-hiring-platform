// routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all jobs
router.get("/", (req, res) => {
  db.query("SELECT * FROM jobs", (err, results) => {
    if (err) {
      console.error("❌ Error fetching jobs:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Add a job
router.post("/", (req, res) => {
  const { title, description } = req.body;
  db.query(
    "INSERT INTO jobs (title, description) VALUES (?, ?)",
    [title, description],
    (err, result) => {
      if (err) {
        console.error("❌ Error adding job:", err);
        return res.status(500).json({ error: "Insert failed" });
      }
      res.json({ id: result.insertId, title, description });
    }
  );
});

// Update a job
router.put("/:id", (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  db.query(
    "UPDATE jobs SET title = ?, description = ? WHERE id = ?",
    [title, description, id],
    (err) => {
      if (err) {
        console.error("❌ Error updating job:", err);
        return res.status(500).json({ error: "Update failed" });
      }
      res.json({ id, title, description });
    }
  );
});

// Delete a job
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM jobs WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("❌ Error deleting job:", err);
      return res.status(500).json({ error: "Delete failed" });
    }
    res.json({ message: "Job deleted", id });
  });
});

module.exports = router;
