import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db.js';
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import attendanceRoutes from './routes/attendance.js'; // <-- Added import
import courseRoutes from './routes/courses.js';
// ... existing app setup
app.use('/api/courses', courseRoutes);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes); // <-- Mounted route

app.get('/api/health', (req, res) => {
  res.json({ status: 'online', message: 'CampusFlow Backend API running' });
});

app.get('/api/db-check', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ status: 'success', message: 'PostgreSQL connection verified', dbTime: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Global Error Handling Middleware
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error('[CampusFlow Express Error]:', err.stack || err);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`[CampusFlow Server] Running on http://localhost:${PORT}`);
});