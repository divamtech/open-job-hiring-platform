const express = require('express')
const multer = require('multer')
const cors = require('cors')
const serverless = require('serverless-http')
const dotenv = require('dotenv')
dotenv.config()

const jobsRoutes = require('./jobs')

const app = express()
app.use(cors())
app.use(express.json())
app.use(multer({ dest: '/tmp' }).single('file'))
app.use('/api', jobsRoutes)

// Conditionally export for Lambda or run local
if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
  const serverless = require('serverless-http')
  module.exports.handler = serverless(app)
} else {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  })
}
