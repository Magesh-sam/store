import { pool } from '../database/db.js';

export const addToWishlist = async (userId: number, productId: number) => {
  const result = await pool.query(
    'INSERT INTO wishlists (user_id, product_id) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *',
    [userId, productId]
  );
  return result.rows[0];
};

export const removeFromWishlist = async (userId: number, productId: number) => {
  await pool.query('DELETE FROM wishlists WHERE user_id = $1 AND product_id = $2', [userId, productId]);
};

export const getWishlist = async (userId: number) => {
  const result = await pool.query(
    'SELECT p.* FROM wishlists w JOIN products p ON w.product_id = p.id WHERE w.user_id = $1 ORDER BY w.created_at DESC',
    [userId]
  );
  return result.rows;
};
