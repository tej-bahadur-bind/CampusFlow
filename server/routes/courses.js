import express from 'express';
import db from '../db.js';
import { requireRole } from '../middleware/rbac.js';

const router = express.Router();

// GET all courses
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM courses ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add new course (Admin & Teacher only)
router.post('/', requireRole(['Admin', 'Teacher']), async (req, res) => {
  const { course_code, title, department, credits } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO courses (course_code, title, department, credits)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [course_code, title, department, credits || 3]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Course code already exists.' });
    }
    res.status(500).json({ message: error.message });
  }
});

// DELETE course (Admin only)
router.delete('/:id', requireRole(['Admin']), async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM courses WHERE id = $1', [id]);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;