import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET all students
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM students ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students: ' + error.message });
  }
});

// POST add new student
router.post('/', async (req, res) => {
  const { roll_number, name, email, department, year, status } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO students (roll_number, name, email, department, year, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [roll_number, name, email, department, year || 1, status || 'Active']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Student with this roll number or email already exists.' });
    }
    res.status(500).json({ message: error.message });
  }
});

// PUT update existing student
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { roll_number, name, email, department, year, status } = req.body;

  try {
    const result = await db.query(
      `UPDATE students 
       SET roll_number = $1, name = $2, email = $3, department = $4, year = $5, status = $6
       WHERE id = $7 RETURNING *`,
      [roll_number, name, email, department, year, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Student with this roll number or email already exists.' });
    }
    res.status(500).json({ message: error.message });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM students WHERE id = $1', [id]);
    res.json({ message: 'Student removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;