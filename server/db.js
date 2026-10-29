import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Automatically locate .env inside the server folder
dotenv.config({ path: path.join(__dirname, '.env') });

const { Pool } = pg;

// Prioritize DATABASE_URL with SSL (for Neon / Render), fallback to individual vars (for local dev)
const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // Required for Neon PostgreSQL
      },
    }
  : {
      user: String(process.env.DB_USER || 'postgres'),
      password: String(process.env.DB_PASSWORD || ''),
      host: String(process.env.DB_HOST || 'localhost'),
      port: Number(process.env.DB_PORT) || 5432,
      database: String(process.env.DB_NAME || 'campusflow_db'),
    };

const pool = new Pool(poolConfig);

// Test Database Connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('[Database] Connection Error:', err.message);
  } else {
    console.log(
      `[Database] Connected to PostgreSQL (${
        process.env.DATABASE_URL ? 'Neon Cloud DB' : process.env.DB_NAME || 'campusflow_db'
      })`
    );
    release();
  }
});

export default pool;