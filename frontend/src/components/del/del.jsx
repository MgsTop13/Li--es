import "./del.scss"
import { useEffect, useState } from "react";
import api from "../../axios.js"
import { useNavigate } from "react-router";


export default function Del({onClose, nameLicao}) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate(); 
    function name(){
        console.log("NOME RECEBIDO: ", nameLicao)
    }

    async function Deletar(){
        if(!token){
            alert("Faça login!") 
            return navigate("/Login")        
        }
        try{
            const response = await api.delete(`/DeletarLicao/${nameLicao}/${token}`)
            if(response.data === "Token invalido"){
                alert("Faça login novamente!")
                return navigate("/Login")
            }

            if(response.data.banco.error === null){
                alert("Atividade deletada!")
            }
        } catch(error){
            console.error(error)
        }
    }

    return (
        <div className="div-remover">
            <section className="page-remover">
                <h1>Você tem certeza que quer remover a atividade {nameLicao}?</h1>
                <button onClick={Deletar}>Sim</button>
            </section>
            <button className="Fechar" onClick={onClose}>Fechar</button>
        </div>
    );
}
