const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Enable CORS for all routes (you can specify a more restrictive origin later)
app.use(cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Your routes
const candidateRoutes = require("./routes/candidateRoutes");
app.use("/api", candidateRoutes); // Candidate-related routes

const adminJobRoutes = require("./routes/jobRoutes");
app.use("/api/jobs", adminJobRoutes); // Job management routes

const publicJobRoutes = require("./routes/jobs");
app.use("/api", publicJobRoutes); // Public job listing and apply routes

// Serve uploaded resumes (if necessary)

// 🚀 Start locally or export for AWS Lambda
if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
  const serverless = require("serverless-http");
  module.exports.handler = serverless(app);
} else {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}
