// Load environment variables FIRST
const dotenv = require("dotenv");
dotenv.config();

// Import packages
const express = require("express");
const cors = require("cors");

// Database connection
const connectDB = require("./config/db");

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
