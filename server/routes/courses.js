import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET all courses with optional student enrollment status
router.get('/', async (req, res) => {
  const { userId } = req.query;

  try {
    if (userId) {
      const result = await db.query(
        `SELECT c.*, 
                CASE WHEN e.id IS NOT NULL THEN TRUE ELSE FALSE END AS is_enrolled
         FROM courses c
         LEFT JOIN enrollments e ON c.id = e.course_id AND e.user_id = $1
         ORDER BY c.id DESC`,
        [userId]
      );
      return res.json(result.rows);
    }

    const result = await db.query('SELECT * FROM courses ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Fetch courses error:', err);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});

// POST Enroll in a course
router.post('/enroll', async (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({ message: 'User ID and Course ID are required.' });
  }

  try {
    await db.query(
      `INSERT INTO enrollments (user_id, course_id)
       VALUES ($1, $2)
       ON CONFLICT (user_id, course_id) DO NOTHING`,
      [userId, courseId]
    );

    res.status(201).json({ message: 'Enrolled in course successfully' });
  } catch (err) {
    console.error('Enrollment error:', err);
    res.status(500).json({ message: 'Failed to enroll in course' });
  }
});

// POST Drop/Unenroll from a course
router.post('/unenroll', async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    await db.query(
      'DELETE FROM enrollments WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    );

    res.json({ message: 'Unenrolled from course successfully' });
  } catch (err) {
    console.error('Unenrollment error:', err);
    res.status(500).json({ message: 'Failed to unenroll from course' });
  }
});

// POST Add a new course offering (Admin/Faculty)
router.post('/', async (req, res) => {
  const { course_code, title, department, credits, userRole } = req.body;
  const headerRole = req.headers['x-user-role'];

  const activeRole = (userRole || headerRole || '').toLowerCase();
  const allowedRoles = ['admin', 'teacher', 'faculty'];

  if (!allowedRoles.includes(activeRole)) {
    return res.status(403).json({
      message: 'Access denied. Requires Admin or Faculty role.',
    });
  }

  if (!course_code || !title) {
    return res.status(400).json({ message: 'Course code and title are required.' });
  }

  try {
    const newCourse = await db.query(
      'INSERT INTO courses (course_code, title, department, credits) VALUES ($1, $2, $3, $4) RETURNING *',
      [course_code, title, department || 'Computer Science', parseInt(credits, 10) || 3]
    );

    res.status(201).json(newCourse.rows[0]);
  } catch (err) {
    console.error('Add course error:', err);
    res.status(500).json({ message: 'Failed to create course' });
  }
});

export default router;