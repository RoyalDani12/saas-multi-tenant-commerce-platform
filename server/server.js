import { config } from "./src/config/env.js";
import app from "./app.js";
import pool from "./src/config/db.js";






// verify  DB connection before starting server
const startServer = async () => {
  try {
  
     await pool.query("SELECT 1");
    //  server
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed. Server not started",error.message);
    process.exit(1);
  }
};
startServer();
   