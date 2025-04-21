// config/db.js
const mysql = require("mysql2/promise"); // ✅ Promise wrapper import karo

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "vishnu9664",
  database: "hiring_platform_dev_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection()
  .then(() => {
    console.log("✅ MySQL connected!");
  })
  .catch((err) => {
    console.error("❌ MySQL connection failed:", err);
  });

module.exports = db;
