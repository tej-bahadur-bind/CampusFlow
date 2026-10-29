import express from 'express';
import db from '../db.js';

const router = express.Router();

// Get all courses catalog
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM courses ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch courses error:', err);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});

// Add a new course offering
router.post('/', async (req, res) => {
  const { course_code, title, department, credits, userRole } = req.body;
  const headerRole = req.headers['x-user-role'];

  // Normalize role checking to lowercase
  const activeRole = (userRole || headerRole || '').toLowerCase();
  const allowedRoles = ['admin', 'teacher', 'faculty'];

  if (!allowedRoles.includes(activeRole)) {
    return res.status(403).json({
      message: 'Access denied. Requires one of the following roles: Admin, Teacher, or Faculty.',
    });
  }

  if (!course_code || !title) {
    return res.status(400).json({ message: 'Course code and title are required fields.' });
  }

  try {
    const newCourse = await db.query(
      'INSERT INTO courses (course_code, title, department, credits) VALUES ($1, $2, $3, $4) RETURNING *',
      [course_code, title, department || 'Computer Science', parseInt(credits, 10) || 3]
    );

    res.status(201).json(newCourse.rows[0]);
  } catch (err) {
    console.error('Add course error:', err);
    res.status(500).json({ message: 'Failed to create course', error: err.message });
  }
});

// Delete a course offering
router.delete('/:id', async (req, res) => {
  const headerRole = req.headers['x-user-role'];
  const activeRole = (headerRole || '').toLowerCase();
  const allowedRoles = ['admin', 'teacher', 'faculty'];

  if (!allowedRoles.includes(activeRole)) {
    return res.status(403).json({ message: 'Access denied. Only Admins or Faculty can delete courses.' });
  }

  try {
    await db.query('DELETE FROM courses WHERE id = $1', [req.params.id]);
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error('Delete course error:', err);
    res.status(500).json({ message: 'Failed to delete course' });
  }
});

export default router;