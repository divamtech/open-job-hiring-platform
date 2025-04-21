const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all jobs
router.get("/", async (req, res) => {
  try {
    console.log("🔍 Fetching all jobs...");
    const [results] = await db.query("SELECT * FROM jobs");
    res.json(results);
  } catch (err) {
    console.error("❌ Error fetching jobs:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Add a job
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO jobs (title, description) VALUES (?, ?)",
      [title, description]
    );
    res.json({ id: result.insertId, title, description });
  } catch (err) {
    console.error("❌ Error adding job:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update a job
router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  try {
    await db.query("UPDATE jobs SET title = ?, description = ? WHERE id = ?", [
      title,
      description,
      id,
    ]);
    res.json({ id, title, description });
  } catch (err) {
    console.error("❌ Error updating job:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete a job
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM jobs WHERE id = ?", [id]);
    res.json({ message: "Job deleted", id });
  } catch (err) {
    console.error("❌ Error deleting job:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
