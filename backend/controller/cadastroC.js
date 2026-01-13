import {Router} from "express"
import {supabase} from "../supabaseClient.js"
import {generateToken, verifyToken} from "../utils/jwt.js"
import * as CadastroR from "../repository/cadastroR.js"
const endpoint = Router();
import MD5 from "md5"

endpoint.get("/Users", async(req,res) => {
    try{
        const response = await supabase
            .from("cadastro")
            .select("*")
            
        res.send(response)
    } catch(error){
        res.send({OiaOErr: error})
    }
})

endpoint.post("/Cadastro", async(req,res) => {
    const dadosUser = req.body;
    try{
        const decoded = MD5(dadosUser.password)
        const response = await supabase
            .from("cadastro")
            .insert([{
                name: dadosUser.name,
                email: dadosUser.email,
                password: decoded,
                recuperacao: dadosUser.recuperacao
            }])
            
            res.send({banco: response})
    } catch(error){
        res.send({OiaOError: error.message})
    }
})

endpoint.post("/Login", async(req,res) =>{
    const dados = req.body;
    
    try {
        // ⬇️ CORREÇÃO: Usar o campo correto (username ou name)
        const nomeUsuario = dados.username || dados.name;
        
        if (!nomeUsuario || !dados.password) {
            return res.status(400).send({ error: "Username e senha são obrigatórios" });
        }
        
        // ⬇️ CORREÇÃO: Passar o nome correto
        const dadosUser = await CadastroR.SelecionarNomes(nomeUsuario);
        
        if (!dadosUser.data || dadosUser.data.length === 0) {
            return res.status(401).send({ error: "Usuário não encontrado" });
        }
        
        const formatDados2 = dadosUser.data[0];
        const decoded = MD5(dados.password);
        
        // ⬇️ CORREÇÃO: Comparar apenas senha (ou senha e username)
        if (formatDados2.password !== decoded) {
            return res.status(401).send({ error: "Senha incorreta" });
        }
        
        // ⬇️ CORREÇÃO: Verificar se o username também bate (opcional)
        if (formatDados2.name !== nomeUsuario) {
            return res.status(401).send({ error: "Usuário não encontrado" });
        }
        
        const token = generateToken(formatDados2);
        res.send({ 
            success: true, 
            message: "Login realizado com sucesso",
            token: token,
            user: {
                id: formatDados2.id,
                name: formatDados2.name,
                email: formatDados2.email
            }
        });
        
    } catch(error) {
        console.error("Erro no login:", error);
        res.status(500).send({ error: "Erro interno no servidor" });
    }
});

endpoint.post("/TestarToken", async(req,res) =>{
    const {token} = req.body;
    const decoded = verifyToken(token)
    res.send({dados: decoded})
})

export default endpoint;