// api/index.js
const express = require('express');
const serverless = require('serverless-http'); // required for Vercel serverless
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const earlyAccessRoutes = require('../routes/earlyAccess');
const icoRoutes = require('../routes/ico');
const investorRoutes = require('../routes/investor');
const marketplaceRoutes = require('../routes/marketplace');

// Mount routes
app.use('/early-access', earlyAccessRoutes);
app.use('/ico', icoRoutes);
app.use('/investor', investorRoutes);
app.use('/marketplace', marketplaceRoutes);

// Root endpoint (optional)
app.get('/', (req, res) => {
  res.send('API is running!');
});

// Export serverless handler for Vercel
module.exports = serverless(app);

// const express = require("express");
// const app = express();

// app.use(express.json());

// // ✅ Import routes
// const earlyAccessRoutes = require("../routes/earlyAccess");
// const icoRoutes = require("../routes/ico");
// const investorRoutes = require("../routes/investor");
// const marketplaceRoutes = require("../routes/marketplace");

// // ✅ Use routes
// app.use("/early-access", earlyAccessRoutes);
// app.use("/ico", icoRoutes);
// app.use("/investor", investorRoutes);
// app.use("/marketplace", marketplaceRoutes);

// // Root test route
// app.get("/", (req, res) => {
//   res.json({ message: "API running on Vercel 🚀" });
// });

// module.exports = app;