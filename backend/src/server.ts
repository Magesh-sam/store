import app from "./app.js";
import { pool } from "./database/db.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Check DB connection
    const client = await pool.connect();
    console.log("✅ Connected to PostgreSQL");
    client.release();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database", error);
    process.exit(1);
  }
};

startServer();
