import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Base Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    message: 'CampusFlow Backend API is running smoothly',
    timestamp: new Date().toISOString(),
  });
});

// Database Check Route
app.get('/api/db-check', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({
      status: 'success',
      message: 'PostgreSQL connection verified',
      dbTime: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to query PostgreSQL database',
      error: error.message,
    });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`[CampusFlow Server] Running on http://localhost:${PORT}`);
});