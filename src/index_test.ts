// import * as express from "express";
// import * as dotenv from "dotenv";
// import { z } from 'zod';
// import AdminRepository from "./repository/AdminRepository";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.listen(3000, () => {
//   console.log('Servidor rodando na porta 3000');
// });

// const CreateAdminSchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   password: z.string(),
//   role: z.string(),
// });

// app.post("/admin", async (req, res) => {
//       const validationPayload = CreateAdminSchema.safeParse(await req.body);

//       if (!validationPayload.success) {
//         res.status(400).json({ error: validationPayload.error.errors });
//       }

//       const payload = validationPayload.data;

//       if (payload == undefined) {
//         res.status(400).json({ error: 'Dados errados' });
//       } else {
//         const admin = await AdminRepository.create(payload);
//         res.json(admin);
//       }
// });


// app.get("/admin/:email", async (req, res) => {
//   try {
//     const email = req.params.email;
//     const admin = await AdminRepository.findByEmail(email);
//     res.json(admin);
//   } catch (error: any) {
//     res.status(404).json({ message: "Admin não encontrado", error: error.message})
//   }
// });