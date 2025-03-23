const express = require('express')
const mysql = require('mysql2/promise')
const fs = require('fs')
const path = require('path')
const router = express.Router()

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

router.get('/jobs', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM jobs')
  res.json(rows)
})

router.get('/job/:id', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM jobs WHERE id = ?', [req.params.id])
  res.json(rows[0])
})

router.post('/apply', async (req, res) => {
  const { name, email, phone, coverLetter, portfolio, jobId } = req.body
  let resume = ''

  if (req.file) {
    const uploadsDir = path.join(__dirname, '..', 'uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir)
    }

    const fileExt = path.extname(req.file.originalname)
    const fileName = `${Date.now()}-${req.file.originalname}`.replace(/\s+/g, '-')
    const destination = path.join(uploadsDir, fileName)

    fs.copyFileSync(req.file.path, destination)
    resume = `/uploads/${fileName}`
  }

  await pool.query('INSERT INTO applications SET ?', {
    name,
    email,
    phone,
    coverLetter,
    portfolio,
    resume,
    jobId,
    status: 'Test Pending',
  })
  res.send({ message: 'Application Received' })
})
module.exports = router
