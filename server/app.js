import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const app = express();

// 1. Security First
app.use(helmet()); 
app.use(cors());

// 2. Logging
app.use(morgan("dev")); 

// 3. Body Parsing

app.use(express.json());

// 4. Routes
app.get("/", (req, res) => {
  res.status(200).json({ message: "System Secure and Logged" });
});

export default app;