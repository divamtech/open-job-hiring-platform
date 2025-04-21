const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
  const { candidate_id, exam_id, score, total_questions, passed } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO exam_results (candidate_id, exam_id, score, total_questions, passed, submitted_at) 
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [candidate_id, exam_id, score, total_questions, passed]
    );
    res.json({ message: "Result saved!", resultId: result.insertId });
  } catch (err) {
    console.error("Error saving exam result:", err);
    res.status(500).json({ message: "Error saving exam result", error: err });
  }
});

module.exports = router;
