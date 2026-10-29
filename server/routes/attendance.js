import express from 'express';
import db from '../db.js';

const router = express.Router();

const VALID_STATUSES = new Set(['Present', 'Absent', 'Late']);

function isValidDate(value) {
  return (
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(`${value}T00:00:00Z`)) &&
    new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value
  );
}

// Authorization middleware for recording attendance
const requireTeacherOrAdmin = (req, res, next) => {
  const headerRole = req.headers['x-user-role'];
  const bodyRole = req.body.userRole;
  const activeRole = (headerRole || bodyRole || 'student').toLowerCase();

  const allowedRoles = ['admin', 'teacher', 'faculty'];

  if (!allowedRoles.includes(activeRole)) {
    return res.status(403).json({
      message: 'Access Denied: Only Teachers and Administrators can record or modify attendance.',
    });
  }

  next();
};

// Bulk Save Handler
const handleBulkSave = async (req, res) => {
  const { date, records } = req.body;

  if (!isValidDate(date)) {
    return res.status(400).json({
      message: 'Provide a valid date in YYYY-MM-DD format.',
    });
  }

  if (!Array.isArray(records) || records.length === 0 || records.length > 1000) {
    return res.status(400).json({
      message: 'Records must be a non-empty array of student entries.',
    });
  }

  const seenIds = new Set();

  for (const record of records) {
    const id = record?.student_id;

    if (
      !Number.isSafeInteger(id) ||
      id <= 0 ||
      seenIds.has(id) ||
      !VALID_STATUSES.has(record?.status) ||
      (record?.remarks != null && typeof record.remarks !== 'string')
    ) {
      return res.status(400).json({
        message: 'Invalid record entry detected. Ensure status and student IDs are valid.',
      });
    }

    seenIds.add(id);
  }

  const client = await db.connect();

  try {
    await client.query('BEGIN');

    for (const record of records) {
      await client.query(
        `INSERT INTO attendance (student_id, date, status, remarks)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (student_id, date)
         DO UPDATE SET
           status = EXCLUDED.status,
           remarks = EXCLUDED.remarks`,
        [record.student_id, date, record.status, record.remarks?.trim() || null]
      );
    }

    await client.query('COMMIT');

    return res.json({
      message: 'Attendance saved successfully.',
      saved: records.length,
      date,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Save attendance error:', error);
    return res.status(500).json({ message: 'Unable to save attendance.' });
  } finally {
    client.release();
  }
};

// GET /api/attendance/summary
router.get('/summary', async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);

    const [studentsCount, attendanceStats] = await Promise.all([
      db.query('SELECT COUNT(*)::int FROM students'),
      db.query(
        `SELECT status, COUNT(*)::int 
         FROM attendance 
         WHERE date = $1 
         GROUP BY status`,
        [today]
      ),
    ]);

    const totalStudents = studentsCount.rows[0].count || 0;
    const statsMap = { Present: 0, Absent: 0, Late: 0 };

    attendanceStats.rows.forEach((row) => {
      statsMap[row.status] = row.count;
    });

    const totalMarked = statsMap.Present + statsMap.Absent + statsMap.Late;
    const rate = totalMarked > 0 ? ((statsMap.Present / totalMarked) * 100).toFixed(1) : 0;

    res.json({
      totalStudents,
      todayMarked: totalMarked,
      present: statsMap.Present,
      absent: statsMap.Absent,
      late: statsMap.Late,
      attendanceRate: Number(rate),
    });
  } catch (error) {
    console.error('Summary API Error:', error);
    res.status(500).json({ message: 'Error retrieving summary metrics.' });
  }
});

// GET /api/attendance?date=YYYY-MM-DD
router.get('/', async (req, res) => {
  const { date } = req.query;

  if (!isValidDate(date)) {
    return res.status(400).json({ message: 'Provide a valid date in YYYY-MM-DD format.' });
  }

  try {
    const result = await db.query(
      `SELECT a.id, a.student_id, a.date, a.status, a.remarks, s.name, s.roll_number
       FROM attendance a
       JOIN students s ON s.id = a.student_id
       WHERE a.date = $1
       ORDER BY s.name`,
      [date]
    );

    return res.json(result.rows);
  } catch (error) {
    console.error('Fetch attendance error:', error);
    return res.status(500).json({ message: 'Unable to fetch attendance.' });
  }
});

// Protect all write endpoints with authorization middleware
router.post('/bulk', requireTeacherOrAdmin, handleBulkSave);
router.post('/', requireTeacherOrAdmin, handleBulkSave);

export default router;