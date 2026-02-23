const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  router.post("/", (req, res) => {
    const { name, email, company, agree } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const sql =
      "INSERT INTO marketplace_applications (name, email, company, agree) VALUES (?, ?, ?,?)";

    db.query(
      sql,
      [name, email, company, agree],
      (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        res.json({
          message: "Marketplace application submitted",
          id: result.insertId,
        });
      }
    );
  });

  router.get("/", (req, res) => {
    db.query("SELECT * FROM marketplace_applications", (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
  });

  return router;
};
