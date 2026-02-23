const express = require("express");
const mysql = require("mysql2"); // or 'mysql' if you prefer
require("dotenv").config();

const router = express.Router();

// Create DB connection (serverless-friendly)
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// POST - Submit Early Access Form
router.post("/", (req, res) => {
  const { name, email, company, agree } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const sql =
    "INSERT INTO early_access (name, email, company, agree) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, company, agree ? 1 : 0], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      message: "Successfully added to Early Access List",
      id: result.insertId,
    });
  });
});

// GET - View All
router.get("/", (req, res) => {
  db.query("SELECT * FROM early_access", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;


// const express = require("express");

// module.exports = (db) => {
//   const router = express.Router();

//   // POST - Submit Early Access Form
//   router.post("/", (req, res) => {
//     const { name, email, company, agree } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     const sql =
//       "INSERT INTO early_access (name, email, company, agree) VALUES (?, ?, ?, ?)";

//     db.query(sql, [name, email, company, agree ? 1 : 0], 
//         (err, result) => {
//       if (err) return res.status(500).json({ error: err.message });

//       res.json({
//         message: "Successfully added to Early Access List",
//         id: result.insertId,
//       });
//     });
//   });

//   // GET - View All
//   router.get("/", (req, res) => {
//     db.query("SELECT * FROM early_access", (err, results) => {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json(results);
//     });
//   });

//   return router;
// };
