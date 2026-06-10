import dotenv from "dotenv";
import pkg from "pg";
dotenv.config();
const { Pool, types } = pkg;

types.setTypeParser(1082, (val) => val); // Parse numeric types as strings to avoid precision issues
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err) => {
  console.error('Unexpected error:', err);
  process.exit(-1);
});
export default pool;