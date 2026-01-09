import dotenv from "dotenv"
dotenv.config()

import {supabase} from "../supabaseClient.js"

export async function SelecionarNomes(nome){
    try{
        const response = await supabase
            .from("cadastro")
            .select("*")
            .eq("name", nome)
        return response
    } catch(error){
        return error
    }
}
