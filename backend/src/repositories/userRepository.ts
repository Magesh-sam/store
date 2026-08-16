import { pool } from '../database/db.js';

export const createUser = async (username: string, email: string, passwordHash: string) => {
  const result = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, role, created_at',
    [username, email, passwordHash]
  );
  return result.rows[0];
};

export const getUserByEmail = async (email: string) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

export const getUserById = async (id: number) => {
  const result = await pool.query('SELECT id, username, email, role, created_at FROM users WHERE id = $1', [id]);
  return result.rows[0];
};
