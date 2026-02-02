import {Router} from "express"
const endpoint = Router();
import {supabase} from "../supabaseClient.js"
import {generateToken, verifyToken} from "../utils/jwt.js"

endpoint.get("/CarregarEscolas", async(req,res) => {
    try{
        const escolas = await supabase
            .from("escola")
            .select("*")
        res.send({escolas: escolas})
    } catch(error){
        res.status(500).send({OiaOerror: error.message})
    }
})

endpoint.get("/CarregarLicoes/:school", async(req,res) =>{
    try{
        const school = req.params.school;
        const dadosBanco = await supabase
            .from("licoes")
            .select("*")
            .eq("escola", school);
            
        res.send({atividades: dadosBanco})
    } catch(error){
        res.status(500).send({olhaOError: error.message})
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
                data_entrega: dadosLicao.data,
                escola: dadosLicao.escola
            }])
            
            res.send({banco: responseBanco})
    } catch(error){
        res.status(500).send({OiaOError: error.message})
    }
})

endpoint.delete("/DeletarLicao/:nameLicao/:token", async(req,res) =>{
    const name = req.params.nameLicao;
    const token = req.params.token
    
    try{
        if(!token){
            return res.send("Token nao fornecido")
        }
        const verf = verifyToken(token)
        
        if(!verf.name || !verf.role){
           return res.send("Token invalido")
        }
        const response = await supabase
            .from("licoes")
            .delete()
            .eq("titulo_licao", name)
            console.log(response)
        res.send({banco: response})    
    } catch(error){
        res.status(500).send({OiaOerror: error.message})
    }
})


export default endpoint;