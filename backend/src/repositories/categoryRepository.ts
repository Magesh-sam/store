import { pool } from '../database/db.js';

export const createCategory = async (name: string, description?: string) => {
  const result = await pool.query(
    'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
    [name, description]
  );
  return result.rows[0];
};

export const getCategories = async () => {
  const result = await pool.query('SELECT * FROM categories ORDER BY created_at DESC');
  return result.rows;
};

export const getCategoryById = async (id: number) => {
  const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
  return result.rows[0];
};

export const updateCategory = async (id: number, name?: string, description?: string) => {
  const result = await pool.query(
    `UPDATE categories 
     SET name = COALESCE($1, name), 
         description = COALESCE($2, description), 
         updated_at = CURRENT_TIMESTAMP 
     WHERE id = $3 RETURNING *`,
    [name, description, id]
  );
  return result.rows[0];
};

export const deleteCategory = async (id: number) => {
  const result = await pool.query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};
