import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();

// Register New User
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if user already exists
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const normalizedRole = role.toLowerCase();

    // Insert user into users table
    const newUser = await db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, normalizedRole]
    );

    // Auto-sync student accounts to students roster for analytics tracking
    if (normalizedRole === 'student') {
      const generatedRoll = `CS${Math.floor(1000 + Math.random() * 9000)}`;
      await db.query(
        `INSERT INTO students (name, email, roll_number, department, year)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (email) DO NOTHING`,
        [name, email, generatedRoll, 'Computer Science', '1st Year']
      );
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Find user by email
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const user = result.rows[0];

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Sign JWT Token
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET || 'campusflow_jwt_secret_key',
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

export default router;