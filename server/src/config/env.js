import dotenv from "dotenv";
dotenv.config();

// Validate critical variables immediately
if (!process.env.DB_URL) {
  throw new Error(" MISSING DATABASE_URL in .env");
}

export const config = {
  port: process.env.PORT || 8000,
  dbUrl: process.env.DB_URL,
  nodeEnv: process.env.NODE_ENV || 'development'
};