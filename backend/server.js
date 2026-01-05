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

// Servir arquivos estáticos do frontend
api.use(express.static(path.join(__dirname, 'frontend/dist')));

// Servir arquivos uploadados
api.use('/public', express.static(path.join(__dirname, 'public')));

// Suas rotas da API
adicionarRotas(api);

// Rota curinga para SPA - SOLUÇÃO: usar uma função personalizada
api.use((req, res, next) => {
    // Se for uma rota de API, continuar
    if (req.path.startsWith('/api')) {
        return next();
    }
    // Se for um arquivo (tem extensão), continuar
    if (req.path.includes('.')) {
        return next();
    }
    // Para qualquer outra rota, servir o index.html do React
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

api.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));