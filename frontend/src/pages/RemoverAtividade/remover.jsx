import "./remover.scss";
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import { Link } from "react-router";
import { useState } from "react";
import api from "../../axios.js";
import Cabecalho2 from "../../components/headerPages";
import {useNavigate} from "react-router"


export default function RemoverAtividade() {
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [token, setToken] = useState(localStorage.getItem("token"));

    async function Deletar(){
        if(!token){
            alert("Faça login!") 
            navigate("/Login")
        
        }
        try{
            const response = await api.delete(`/DeletarLicao/${name}/${token}`)
            alert(response.data.banco.data)
        } catch(error){
            alert(error.message)
        }
    }

    return (
        <main className="main-remover">
            <Cabecalho2 
                nomePage="Remover Lição"
            />
            <section className="page-remover">
                <h3>Título da matéria</h3>
                <input type="text" 
                    placeholder="Como brasil foi descoberto?" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <button onClick={Deletar}>Remover Atividade</button>
            </section>
        </main>
    );
}
