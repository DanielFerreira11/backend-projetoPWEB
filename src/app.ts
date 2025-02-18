import express from "express";
import dotenv from "dotenv";
import AdminRoutes from "./routes/AdminRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(AdminRoutes);

export default app;
