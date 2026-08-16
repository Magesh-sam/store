import { pool } from './src/database/db.js';

async function seedStore() {
  try {
    // 1. Seed Categories
    console.log('Seeding categories...');
    const categoryQuery = `
      INSERT INTO categories (name, description) 
      VALUES 
        ('Electronics', 'Gadgets and electronic devices'),
        ('Clothing', 'Apparel and accessories'),
        ('Home', 'Home decor and furniture')
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `;
    const categoriesResult = await pool.query(categoryQuery);
    
    // Fetch all categories to get their IDs
    const allCategories = await pool.query('SELECT * FROM categories');
    const electronicsId = allCategories.rows.find(c => c.name === 'Electronics')?.id;
    const clothingId = allCategories.rows.find(c => c.name === 'Clothing')?.id;
    const homeId = allCategories.rows.find(c => c.name === 'Home')?.id;

    if (!electronicsId || !clothingId || !homeId) {
      throw new Error('Categories failed to seed');
    }

    // 2. Seed Products
    console.log('Seeding products...');
    const productQuery = `
      INSERT INTO products (name, description, price, stock, category_id, image_url) 
      VALUES 
        ('Wireless Headphones', 'Premium noise-canceling headphones', 299.99, 50, $1, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'),
        ('Mechanical Keyboard', 'RGB Mechanical Gaming Keyboard', 149.99, 30, $1, 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80'),
        ('Classic T-Shirt', '100% Cotton classic white t-shirt', 24.99, 100, $2, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'),
        ('Denim Jacket', 'Vintage style denim jacket', 89.99, 20, $2, 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80'),
        ('Ceramic Coffee Mug', 'Handcrafted ceramic mug', 19.99, 45, $3, 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80'),
        ('Desk Lamp', 'Modern LED desk lamp', 45.99, 15, $3, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80')
      ON CONFLICT DO NOTHING
      RETURNING *;
    `;
    // We don't have a unique constraint on product name by default in the schema (or do we?),
    // but the above might insert duplicates if run multiple times. We can just clear the table first for seed.
    
    // Actually, let's clear existing products and categories to ensure a clean state
    console.log('Clearing existing data...');
    await pool.query('DELETE FROM cart_items');
    await pool.query('DELETE FROM order_items');
    await pool.query('DELETE FROM reviews');
    await pool.query('DELETE FROM wishlists');
    await pool.query('DELETE FROM products');
    
    // Then re-insert
    await pool.query(productQuery, [electronicsId, clothingId, homeId]);

    console.log('Store seeded successfully!');
  } catch (error) {
    console.error('Error seeding store:', error);
  } finally {
    await pool.end();
  }
}

seedStore();
