import {Router} from "express"
import {supabase} from "../supabaseClient.js"
import {generateToken, verifyToken} from "../utils/jwt.js"
import * as CadastroR from "../repository/cadastroR.js"
const endpoint = Router();
import MD5 from "md5"


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
    
    try{
        const dadosUser = await CadastroR.SelecionarNomes(dados.name)
        const formatDados = dadosUser.data
        const formatDados2 = formatDados[0]
        //const decoded = MD5(dados.password)
        
        if(formatDados2.password !== dados.password || formatDados2.name !== dados.name || formatDados2.email !== dados.email){
            return res.send("Dados incorretos")
        }
       
            const token = generateToken(formatDados2)
            res.send({token: token})
        
    } catch(error){
        res.send({OiaOError: error.message})
    }
})

endpoint.post("/TestarToken", async(req,res) =>{
    const {token} = req.body;
    const decoded = verifyToken(token)
    res.send({dados: decoded})
})

export default endpoint;