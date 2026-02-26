// Load env variables
require("dotenv").config();

// Import packages
const express = require("express");
const cors = require("cors");

// Initialize app
const app = express();

// Connect DB (just import, it auto-connects)
require("./config/db");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authroutes"));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
module.exports = app;