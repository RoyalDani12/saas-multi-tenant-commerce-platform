import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("MISSING DATABASE_URL in .env");
}

export const config = {
  port: process.env.PORT || 8000,
  dbUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV || "development",
};