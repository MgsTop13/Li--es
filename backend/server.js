import express from "express"
import cors from "cors"

import { adicionarRotas } from "./rotas.js"

const api = express();
const porta = process.env.PORT || 5010;


api.use(cors());
api.use(express.json());


adicionarRotas(api);


api.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));