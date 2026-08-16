import { pool } from '../database/db.js';

export const checkout = async (userId: number) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // 1. Get cart items
    const cartRes = await client.query('SELECT * FROM carts WHERE user_id = $1', [userId]);
    if (cartRes.rows.length === 0) throw new Error('Cart is empty');
    const cartId = cartRes.rows[0].id;

    const itemsRes = await client.query(
      'SELECT ci.product_id, ci.quantity, p.price, p.stock FROM cart_items ci JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = $1',
      [cartId]
    );

    if (itemsRes.rows.length === 0) throw new Error('Cart is empty');
    
    // 2. Validate stock and calculate total
    let totalAmount = 0;
    for (const item of itemsRes.rows) {
      if (item.stock < item.quantity) {
        throw new Error(`Insufficient stock for product id ${item.product_id}`);
      }
      totalAmount += Number(item.price) * item.quantity;
    }

    // 3. Create Order
    const orderRes = await client.query(
      'INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING *',
      [userId, totalAmount]
    );
    const orderId = orderRes.rows[0].id;

    // 4. Insert Order Items & Reduce Stock
    for (const item of itemsRes.rows) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.product_id, item.quantity, item.price]
      );

      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    // 5. Clear Cart
    await client.query('DELETE FROM cart_items WHERE cart_id = $1', [cartId]);

    await client.query('COMMIT');
    return orderRes.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const getOrdersByUser = async (userId: number) => {
  const result = await pool.query('SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  return result.rows;
};

export const getOrderItems = async (orderId: number) => {
  const result = await pool.query(
    'SELECT oi.id, oi.product_id, p.name, oi.quantity, oi.price FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = $1',
    [orderId]
  );
  return result.rows;
};
