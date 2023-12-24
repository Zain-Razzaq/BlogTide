import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import blogsRoutes from "./routes/blogsRoutes.js";
import connectToDatabase from "./database/connection.js";
import cookieParser from "cookie-parser";
import validateUser from "./controllers/userTokenValidation.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

// Database connection
export const connection = connectToDatabase();

app.use("/blog", blogsRoutes);

app.use("/auth", authRoutes);

app.get("/validate-user", validateUser);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
