import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET results for a specific student
router.get('/', async (req, res) => {
  const { userId } = req.query;

  try {
    if (userId) {
      const result = await db.query(
        `SELECT r.id, r.exam_name, r.marks_obtained, r.total_marks, r.grade, r.created_at,
                c.course_code, c.title as course_title, c.credits, c.department
         FROM results r
         JOIN courses c ON c.id = r.course_id
         WHERE r.user_id = $1
         ORDER BY r.created_at DESC`,
        [userId]
      );
      return res.json(result.rows);
    }

    const allResults = await db.query(
      `SELECT r.*, c.course_code, c.title as course_title, u.name as student_name
       FROM results r
       JOIN courses c ON c.id = r.course_id
       JOIN users u ON u.id = r.user_id
       ORDER BY r.id DESC`
    );
    res.json(allResults.rows);
  } catch (err) {
    console.error('Fetch results error:', err);
    res.status(500).json({ message: 'Failed to fetch academic results.' });
  }
});

// POST endpoint for Teachers/Admins to add or modify grades
router.post('/', async (req, res) => {
  const { userId, courseId, examName, marksObtained, totalMarks, grade, userRole } = req.body;
  const role = (req.headers['x-user-role'] || userRole || '').toLowerCase();

  if (!['admin', 'teacher', 'faculty'].includes(role)) {
    return res.status(403).json({ message: 'Access denied. Only staff can record grades.' });
  }

  try {
    const result = await db.query(
      `INSERT INTO results (user_id, course_id, exam_name, marks_obtained, total_marks, grade)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (user_id, course_id, exam_name)
       DO UPDATE SET
         marks_obtained = EXCLUDED.marks_obtained,
         total_marks = EXCLUDED.total_marks,
         grade = EXCLUDED.grade
       RETURNING *`,
      [userId, courseId, examName || 'Final Semester Exam', marksObtained, totalMarks || 100, grade]
    );

    res.status(201).json({ message: 'Result recorded successfully', record: result.rows[0] });
  } catch (err) {
    console.error('Save result error:', err);
    res.status(500).json({ message: 'Failed to record student grade.' });
  }
});

export default router;