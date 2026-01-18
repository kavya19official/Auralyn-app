require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const moodRoutes = require('./routes/mood');
const playlistRoutes = require('./routes/playlist');

const app = express();

// 🌍 Environment config
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// 🔐 Security & middleware
app.use(helmet());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));
app.use(express.json());
app.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

// 📡 Health check
app.get('/health', (req, res) => {
  res.json({
    status: "OK",
    service: "Auralyn Backend",
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// 🔗 API routes (versioned)
app.use('/api/v1/mood', moodRoutes);
app.use('/api/v1/playlist', playlistRoutes);

// 🛑 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Route not found"
  });
});

// 🚨 Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);

  res.status(500).json({
    success: false,
    error: "Internal server error"
  });
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`
🎵 Auralyn Backend Started
--------------------------------
🌍 Environment: ${NODE_ENV}
🚀 Port: ${PORT}
--------------------------------
  `);
});