import pg from "pg";
const { Pool } = pg;
// import dotenv from "dotenv";
// dotenv.config();
// import { config } from "./env.js";




const pool = new Pool({
  connectionString: String(process.env.DB_URL),
});

pool.on("connect", () => {
  console.log("postgres pool connected");
});

pool.on("error", (err) => {
  console.error("Unexpected error", err);
  process.exit();
});

export const query = (text, params) => pool.query(text, params);

export default pool;

// The Pool allows the app to "borrow" a connection, use it, and "return" it instantly.
