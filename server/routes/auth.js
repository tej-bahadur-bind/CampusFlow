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

  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail.endsWith('@camp.ac.in')) {
    return res.status(400).json({
      message: 'Registration restricted: Please use your official college email ending with @camp.ac.in',
    });
  }

  try {
    const userExists = await db.query('SELECT * FROM users WHERE email = $1', [normalizedEmail]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const normalizedRole = role.toLowerCase();

    const newUser = await db.query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, normalizedEmail, hashedPassword, normalizedRole]
    );

    if (normalizedRole === 'student') {
      try {
        const generatedRoll = `CS${Math.floor(10000 + Math.random() * 90000)}`;
        await db.query(
          `INSERT INTO students (name, email, roll_number, department, year)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (email) DO NOTHING`,
          [name, normalizedEmail, generatedRoll, 'Computer Science', '1st Year']
        );
      } catch (syncError) {
        console.error('[Auth Sync Warning] Could not sync student profile:', syncError.message);
      }
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

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [normalizedEmail]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }

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

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required.' });
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail.endsWith('@camp.ac.in')) {
    return res.status(400).json({
      message: 'Password reset is restricted to official campus emails (@camp.ac.in).',
    });
  }

  try {
    const userResult = await db.query('SELECT id FROM users WHERE email = $1', [normalizedEmail]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'No account found registered with this campus email.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await db.query('UPDATE users SET password_hash = $1 WHERE email = $2', [
      hashedPassword,
      normalizedEmail,
    ]);

    res.status(200).json({ message: 'Password reset successfully. Please sign in with your new password.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error during password reset', error: error.message });
  }
});

export default router;