import { Pool, types } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Parse PostgreSQL NUMERIC to JavaScript float
types.setTypeParser(1700, (val: string) => parseFloat(val));

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});
