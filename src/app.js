import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.router.js";

const app = express();
const PORT = 5000;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));
