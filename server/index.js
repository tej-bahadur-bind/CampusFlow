import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import studentRoutes from './routes/students.js';
import attendanceRoutes from './routes/attendance.js';
import courseRoutes from './routes/courses.js';

dotenv.config();

// Initialize express app BEFORE registering middleware or routes
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/courses', courseRoutes);

// Health check endpoint for Render
app.get('/', (req, res) => {
  res.send('CampusFlow API is running smoothly.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});