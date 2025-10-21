import express from "express"
import cors from "cors"
import { adicionarRotas } from "./rotas.js";

const api = express();
const porta = 5010;

api.use(cors());
api.use(express.json());

adicionarRotas(api);

api.listen(porta, () => console.log(`Subiu na porta ${porta}`));