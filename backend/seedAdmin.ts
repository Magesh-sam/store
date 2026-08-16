// seed-admin.js
import bcrypt from "bcrypt";
import { pool } from "./src/database/db.js";

async function seedAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await pool.query(
      `
      INSERT INTO users (username, email, password, role)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (email) DO NOTHING;
      `,
      ["Admin", "admin@email.com", hashedPassword, "ADMIN"]
    );

    console.log("✅ Admin seeded successfully");
  } catch (error) {
    console.error("❌ Failed to seed admin:", error);
  } finally {
    await pool.end();
  }
}

seedAdmin();