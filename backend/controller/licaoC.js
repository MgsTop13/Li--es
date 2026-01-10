import {Router} from "express"
const endpoint = Router();
import {supabase} from "../supabaseClient.js"
import {generateToken, verifyToken} from "../utils/jwt.js"

endpoint.get("/CarregarLicoes", async(req,res) =>{
    try{
        const dadosBanco = await supabase
            .from("licoes")
            .select("*");
            
        res.send({atividades: dadosBanco})
    } catch(error){
        res.status(500).send({olhaOError: error})
    }
})

endpoint.post("/EnviarLicao", async(req,res) =>{
    try{
        const dadosLicao = req.body;
        const verf = verifyToken(dadosLicao.token)
        if(!verf.name || !verf.role){
           return res.send("Token invalido")
        }
         const responseBanco = await supabase
            .from("licoes")
            .insert([{
                id_user: verf.role,
                name: verf.name,
                titulo_licao: dadosLicao.title,
                descricao_licao: dadosLicao.description,
                materia: dadosLicao.materia,
                data_entrega: dadosLicao.data
            }])
            
            res.send({banco: responseBanco})
    } catch(error){
        res.status(500).send({OiaOError: error})
    }
})

endpoint.delete("/DeletarLicao", async(req,res) =>{
    const dadus = req.body;
    try{
        console.log(dadus)
        if(!dadus.token){
            return res.send("Token nao fornecido")
        }
        const verf = verifyToken(dadus.token)
        
        if(!verf.name || !verf.role){
           return res.send("Token invalido")
        }
        const response = await supabase
            .from("licoes")
            .delete()
            .eq("titulo_licao", dadus.nameLicao)
            
        res.send({banco: response})    
    } catch(error){
        res.status(500).send({OiaOerror: error})
    }
})


export default endpoint;