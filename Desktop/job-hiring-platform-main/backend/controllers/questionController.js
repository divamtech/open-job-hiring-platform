const db = require("../config/db");

exports.getQuestionsByExamId = async (req, res) => {
  const examId = req.params.examId;

  try {
    const [rows] = await db.query("SELECT * FROM questions WHERE exam_id = ?", [
      examId,
    ]);
    res.json(rows);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: err.message });
  }
};
