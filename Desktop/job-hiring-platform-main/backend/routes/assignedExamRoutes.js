const express = require("express");
const router = express.Router();
const {
  assignExam,
  getAssignedExams,
  deleteAssignedExam,
} = require("../controllers/assignedExamController");

router.post("/", assignExam);
router.get("/", getAssignedExams);
router.delete("/:id", deleteAssignedExam);

module.exports = router;
