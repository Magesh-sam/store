import { pool } from '../database/db.js';

export const getOrCreateCart = async (userId: number) => {
  const existing = await pool.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
  if (existing.rows.length > 0) return existing.rows[0];

  const newCart = await pool.query('INSERT INTO carts (user_id) VALUES ($1) RETURNING *', [userId]);
  return newCart.rows[0];
};

export const getCartItems = async (cartId: number) => {
  const result = await pool.query(
    `SELECT ci.id, ci.cart_id, ci.product_id, ci.quantity, p.name, p.price, p.image_url 
     FROM cart_items ci 
     JOIN products p ON ci.product_id = p.id 
     WHERE ci.cart_id = $1`,
    [cartId]
  );
  return result.rows;
};

export const addItemToCart = async (cartId: number, productId: number, quantity: number) => {
  const existingItem = await pool.query(
    'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2',
    [cartId, productId]
  );

  if (existingItem.rows.length > 0) {
    const newQty = existingItem.rows[0].quantity + quantity;
    const result = await pool.query(
      'UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [newQty, existingItem.rows[0].id]
    );
    return result.rows[0];
  } else {
    const result = await pool.query(
      'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [cartId, productId, quantity]
    );
    return result.rows[0];
  }
};

export const updateCartItemQuantity = async (cartId: number, productId: number, quantity: number) => {
  const result = await pool.query(
    'UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE cart_id = $2 AND product_id = $3 RETURNING *',
    [quantity, cartId, productId]
  );
  return result.rows[0];
};

export const removeCartItem = async (cartId: number, productId: number) => {
  await pool.query('DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2', [cartId, productId]);
};

export const clearCart = async (cartId: number) => {
  await pool.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);
};
