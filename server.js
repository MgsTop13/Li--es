import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url'
import { adicionarRotas } from "./rotas.js"

const api = express();
const porta = process.env.PORT || 5010;

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

api.use(cors());
api.use(express.json());

// Servir arquivos estáticos
api.use('/public', express.static(path.join(__dirname, 'public')));
api.use(express.static(path.join(__dirname, 'frontend/dist')));

// Suas rotas da API
adicionarRotas(api);

// Rota para servir o frontend (React) - APÓS as rotas da API
api.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

api.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));