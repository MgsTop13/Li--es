import {Router} from "express"
const endpoint = Router();
import {supabase} from "../supabaseClient.js"

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
        const responseBanco = await supabase
            .from("licoes")
            .insert([{
                name: dadosLicao.username,
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
    try{
        const dadus = req.body;
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