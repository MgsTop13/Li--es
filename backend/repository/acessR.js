import { supabase } from "../supabaseClient.js";

export async function ListarAcessos(idUser){
    try{
        const response = await supabase
            .from("acess")
            .select("*")
            .eq("id_aluno", idUser)
            return response;
    } catch(error){
        return error
    }
}

export async function InserirAcesso(idUser, name, school){
    try{
        const response = await supabase
            .from("acess")
            .insert([{
                id_aluno: idUser,
                name,
                salapermissao: school
            }])
            return response;
    } catch(error){
        return error;
    }
}