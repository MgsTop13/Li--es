import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const endpoint = Router();

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar Multer para salvar na pasta public/storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = path.join(__dirname, '../public/storage/lousas');
        
        // Criar diretório se não existir
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        // Nome único para o arquivo
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Apenas imagens são permitidas!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limite
    }
});

endpoint.post('/upload', upload.single('imagem'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'Nenhuma imagem enviada'
            });
        }

        // URL acessível da imagem
        const imageUrl = `/public/storage/lousas/${req.file.filename}`;
        
        console.log('Imagem salva:', req.file.path);

        res.json({
            success: true,
            imageUrl: imageUrl,
            filename: req.file.filename
        });

    } catch (error) {
        console.error('Erro no upload:', error);
        res.status(500).json({
            success: false,
            error: 'Erro interno no servidor'
        });
    }
});

// Rota para deletar imagem (opcional)
endpoint.delete('/imagem/:filename', async (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join('public/storage/lousas', filename);
        
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({ success: true, message: 'Imagem deletada' });
        } else {
            res.status(404).json({ success: false, error: 'Arquivo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

export default endpoint;