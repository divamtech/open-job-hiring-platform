const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// GET all exams
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM exams");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching exams:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new exam
router.post("/", async (req, res) => {
  const { title, description, duration, pass_percentage } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO exams (title, description, duration, pass_percentage) VALUES (?, ?, ?, ?)",
      [title, description, duration, pass_percentage]
    );
    res.json({ message: "Exam created", id: result.insertId });
  } catch (error) {
    console.error("POST exam error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// PUT update exam
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, duration, pass_percentage } = req.body;
  try {
    await pool.query(
      "UPDATE exams SET title = ?, description = ?, duration = ?, pass_percentage = ? WHERE id = ?",
      [title, description, duration, pass_percentage, id]
    );
    res.json({ message: "Exam updated" });
  } catch (error) {
    console.error("PUT exam error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// DELETE exam
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM exams WHERE id = ?", [id]);
    res.json({ message: "Exam deleted" });
  } catch (error) {
    console.error("DELETE exam error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
