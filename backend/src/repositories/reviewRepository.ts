import { pool } from "../database/db.js";

export const addReview = async (
  userId: number,
  productId: number,
  rating: number,
  comment?: string,
) => {
  const result = await pool.query(
    "INSERT INTO reviews (user_id, product_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, productId, rating, comment],
  );
  return result.rows[0];
};

export const getReviewsByProduct = async (productId: number) => {
  const result = await pool.query(
    "SELECT r.id, r.rating, r.comment, r.created_at, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.product_id = $1 ORDER BY r.created_at DESC",
    [productId],
  );
  return result.rows;
};

export const updateReview = async (
  id: number,
  userId: number,
  rating?: number,
  comment?: string,
) => {
  const result = await pool.query(
    `UPDATE reviews 
     SET rating = COALESCE($1, rating), 
         comment = COALESCE($2, comment), 
         updated_at = CURRENT_TIMESTAMP 
     WHERE id = $3 AND user_id = $4 RETURNING *`,
    [rating, comment, id, userId],
  );
  return result.rows[0];
};

export const deleteReview = async (id: number, userId: number) => {
  const result = await pool.query(
    "DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING *",
    [id, userId],
  );
  return result.rows[0];
};
