import express from "express";
import dotenv from "dotenv";
import AdminRoutes from "./routes/AdminRoutes";
import AircraftRoutes from "./routes/AircraftRoutes";
import ClassRoutes from "./routes/ClassRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(AdminRoutes);
app.use(AircraftRoutes);
app.use(ClassRoutes);



export default app;
