import dotenv from "dotenv"
dotenv.config()

export async function SelecionarNomes(nome){
    try{
        const response = await supabaseClient
            .from("Cadastro")
            .select("*")
            .eq("name", nome)
        return response
    } catch(error){
        return error
    }
}