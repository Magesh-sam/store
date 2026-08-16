import { pool } from '../database/db.js';

export const getAllUsers = async () => {
  const result = await pool.query('SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC');
  return result.rows;
};

export const getAllOrders = async () => {
  const result = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
  return result.rows;
};
