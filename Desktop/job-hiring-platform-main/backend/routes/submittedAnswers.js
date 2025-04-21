const express = require("express");
const router = express.Router();
const db = require("../config/db");

// POST - Add new question
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

  if (
    !exam_id ||
    !question_text ||
    !option_a ||
    !option_b ||
    !option_c ||
    !option_d ||
    !correct_option ||
    !difficulty ||
    !type
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

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
    res.status(201).json({ message: "Question added successfully" });
  } catch (err) {
    console.error("❌ Error inserting question:", err);
    res.status(500).json({ error: "Failed to add question" });
  }
});

// PUT - Update existing question
router.put("/:id", async (req, res) => {
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

  if (
    !exam_id ||
    !question_text ||
    !option_a ||
    !option_b ||
    !option_c ||
    !option_d ||
    !correct_option ||
    !difficulty ||
    !type
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const [result] = await db.query(
      `UPDATE questions SET
        exam_id = ?, question_text = ?, option_a = ?, option_b = ?, option_c = ?, option_d = ?,
        correct_option = ?, difficulty = ?, type = ?
       WHERE id = ?`,
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
        req.params.id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({ message: "Question updated successfully" });
  } catch (err) {
    console.error("❌ Error updating question:", err);
    res.status(500).json({ error: "Failed to update question" });
  }
});

module.exports = router;
