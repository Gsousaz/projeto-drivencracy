import { Express } from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}`));
