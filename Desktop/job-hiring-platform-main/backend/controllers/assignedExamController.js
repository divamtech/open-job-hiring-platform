const db = require("../config/db");

exports.assignExam = async (req, res) => {
  const { candidate_id, exam_id } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO assigned_exams (candidate_id, exam_id) VALUES (?, ?)",
      [candidate_id, exam_id]
    );
    res
      .status(201)
      .json({ message: "Exam assigned successfully", id: result.insertId });
  } catch (err) {
    console.error("Error assigning exam:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAssignedExams = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT ae.id, ae.candidate_id, ae.exam_id, ae.assigned_at, c.name AS candidate_name, e.title AS exam_title
       FROM assigned_exams ae
       JOIN applications c ON ae.candidate_id = c.id
       JOIN exams e ON ae.exam_id = e.id
       ORDER BY ae.id DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching assigned exams:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteAssignedExam = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM assigned_exams WHERE id = ?", [id]);
    res.json({ message: "Assignment deleted" });
  } catch (err) {
    console.error("Error deleting assigned exam:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
