const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET all questions
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM questions");
    res.json(rows);
  } catch (err) {
    console.error("❌ Failed to fetch questions:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/exam/:examId", async (req, res) => {
  const { examId } = req.params;
  try {
    const [questions] = await db.query(
      "SELECT * FROM questions WHERE exam_id = ?",
      [examId]
    );
    res.json(questions);
  } catch (err) {
    console.error("Error fetching questions by exam ID:", err);
    res.status(500).json({ message: "Error fetching questions" });
  }
});

// POST question
router.post("/", async (req, res) => {
  const {
    exam_id,
    question_text,
    option_a,
    option_b,
    option_c,
    option_d,
    correct_option,
    difficulty,
    type,
  } = req.body;

  try {
    await db.query(
      `INSERT INTO questions 
      (exam_id, question_text, option_a, option_b, option_c, option_d, correct_option, difficulty, type) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        exam_id,
        question_text,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_option,
        difficulty,
        type,
      ]
    );
    res.status(201).json({ message: "Question added" });
  } catch (err) {
    console.error("❌ Error inserting question:", err);
    res.status(500).json({ error: "Failed to add question" });
  }
});

module.exports = router;
