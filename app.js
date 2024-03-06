import express from "express";
import morgan from "morgan";
import cors from "cors";

import contactsRouter from "./routes/contactsRouter.js";
import mongoose from "mongoose";  
import dotenv from "dotenv";
//import dataBase from "./server.js";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Route not found",
    data: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log(`Database connection successful`);
  })
  .catch((err) => {
    console.error("Database connection error", err);
    process.exit(1);
  });