import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import AdminRoutes from "./routes/AdminRoutes";
import AircraftRoutes from "./routes/AircraftRoutes";
import ClassRoutes from "./routes/ClassRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use(AdminRoutes);
app.use(AircraftRoutes);
app.use(ClassRoutes);



export default app;
