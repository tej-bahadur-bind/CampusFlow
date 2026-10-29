import express from 'express';
import db from '../db.js';

const router = express.Router();

// GET all students (With search and department filtering support)
router.get('/', async (req, res) => {
  const { search, department } = req.query;

  try {
    let query = 'SELECT * FROM students WHERE 1=1';
    const params = [];

    // Filter by department if specified and not 'All Departments'
    if (department && department !== 'All Departments' && department !== 'all') {
      params.push(department);
      query += ` AND department = $${params.length}`;
    }

    // Filter by search term (name or roll number)
    if (search) {
      params.push(`%${search}%`);
      query += ` AND (name ILIKE $${params.length} OR roll_number ILIKE $${params.length})`;
    }

    query += ' ORDER BY id DESC';

    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Fetch students error:', error);
    res.status(500).json({ message: 'Error fetching students: ' + error.message });
  }
});

// POST add new student
router.post('/', async (req, res) => {
  const { roll_number, name, email, department, year, status } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and Email are required fields.' });
  }

  try {
    const generatedRoll = roll_number || `CS${Math.floor(10000 + Math.random() * 90000)}`;
    const result = await db.query(
      `INSERT INTO students (roll_number, name, email, department, year, status)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        generatedRoll,
        name,
        email,
        department || 'Computer Science',
        year || 1,
        status || 'Active',
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Add student error:', error);
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
      [roll_number, name, email, department, year || 1, status || 'Active', id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found.' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update student error:', error);
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
    console.error('Delete student error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;