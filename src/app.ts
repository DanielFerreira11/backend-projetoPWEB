import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import AdminRoutes from "./routes/AdminRoutes";
import AircraftRoutes from "./routes/AircraftRoutes";
import ClassRoutes from "./routes/ClassRoutes";
import InstructorRoutes from "./routes/InstructorRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import AuthRoutes from "./routes/AuthRoutes";

dotenv.config();

const app = express();

// Configuração do CORS
app.use(cors({
  origin: "http://localhost:3000", // Permite acesso somente a partir do front-end
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Caso precise enviar cookies ou autenticação
}));

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(AdminRoutes);
app.use(AircraftRoutes);
app.use(ClassRoutes);
app.use(InstructorRoutes);
app.use(StudentRoutes);
app.use(AuthRoutes);

export default app;
