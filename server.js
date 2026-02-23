const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const earlyAccessRoutes = require("./routes/earlyAccess");
const icoRoutes = require("./routes/ico");
const investorRoutes = require("./routes/investor");
const marketplaceRoutes = require("./routes/marketplace");

app.use("/api/early-access", earlyAccessRoutes);
app.use("/api/join-ico", icoRoutes);
app.use("/api/investor-desk", investorRoutes);
app.use("/api/marketplace", marketplaceRoutes);

// Optional root endpoint
app.get("/", (req, res) => {
  res.send("API running locally 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Database Connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// db.connect((err) => {
//   if (err) {
//     console.error("❌ Database connection failed:", err);
//   } else {
//     console.log("✅ Connected to MySQL Database");
//   }
// });

// // Routes
// app.get("/", (req, res) => {
//   res.json({ message: "API running on Vercel 🚀" });
// });

// app.use("/api/early-access", require("./routes/earlyAccess")(db));
// app.use("/api/join-ico", require("./routes/ico")(db));
// app.use("/api/investor-desk", require("./routes/investor")(db));
// app.use("/api/marketplace", require("./routes/marketplace")(db));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(` Server running on port ${PORT}`);
// });
