import {Router} from "express"
import {supabaseClient} from "../supabaseClient.js"
import {generateToken} from "../utils/jwt.js"
import * as CadastroR from "../repository/cadastroR.js"
const endpoint = Router();


endpoint.post("/Cadastro", async(req,res) => {
    const dadosUser = req.body;
    try{
        const nomesBanco = await CadastroR.SelecionarNomes(dadosUser.name)
        
        /*const response = await supabaseClient
            .from("cadastro")
            .insert([{
                
            }])
            
        res.send({banco: response})    */
    } catch(error){
        res.send({OiaOError: error})
    }
})

endpoint.post("/Login", async(req, res) => {
    try{
        const dadosUser =
    }
})