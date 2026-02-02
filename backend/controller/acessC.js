import * as AcessR from "../repository/acessR.js"
import { Router } from "express"
const endpoint = Router();

endpoint.post("/ListAcess", async(req,res) => {
    try{
        const dados = req.body;
        const banco = await AcessR.ListarAcessos(dados.idUser);
        res.send({banco: banco});
    } catch(error){
        res.status(500).send({OiaOErr: error});
    }
})

endpoint.post("/InsertAcess", async(req,res) => {
    try{
        const dados = req.body;
        const banco = await AcessR.InserirAcesso(dados.idUser, dados.name, dados.school)
        res.send({banco: banco});
    } catch(error){
        res.status(500).send({OiaOErr: error})
    }
})

export default endpoint;