import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Automatically locate .env inside the server folder
dotenv.config({ path: path.join(__dirname, '.env') });

const { Pool } = pg;

const pool = new Pool({
  user: String(process.env.DB_USER || 'postgres'),
  password: String(process.env.DB_PASSWORD || ''),
  host: String(process.env.DB_HOST || 'localhost'),
  port: Number(process.env.DB_PORT) || 5432,
  database: String(process.env.DB_NAME || 'campusflow_db'),
});

// Test Database Connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('[Database] Connection Error:', err.message);
  } else {
    console.log('[Database] Connected to PostgreSQL (campusflow_db)');
    release();
  }
});

export default pool;