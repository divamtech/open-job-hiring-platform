const express = require("express");
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const router = express.Router();

// ✅ MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// ✅ Multer setup for resume uploads
const upload = multer({ dest: "temp/" });

// ✅ Get all jobs
router.get("/jobs", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM jobs ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching jobs:", err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// ✅ Get job by ID
router.get("/job/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM jobs WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ error: "Job not found" });
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error fetching job:", err);
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

// ✅ Apply for a job with resume upload
router.post("/apply", upload.single("resume"), async (req, res) => {
  const { name, email, phone, coverLetter, portfolio, jobId } = req.body;
  let resume = "";

  if (req.file) {
    const uploadsDir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    const fileExt = path.extname(req.file.originalname);
    const fileName = `${Date.now()}-${req.file.originalname}`.replace(
      /\s+/g,
      "-"
    );
    const destination = path.join(uploadsDir, fileName);

    fs.copyFileSync(req.file.path, destination);
    resume = `/uploads/${fileName}`;
  }

  await pool.query("INSERT INTO applications SET ?", {
    name,
    email,
    phone,
    coverLetter,
    portfolio,
    resume,
    jobId,
    status: "Test Pending",
  });

  res.send({ message: "Application Received" });
});

module.exports = router;
