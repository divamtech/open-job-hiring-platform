// config/db.js
const mysql = require("mysql2");
require("dotenv").config(); // Make sure the .env variables are loaded

// Create a connection to the database using values from .env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;
