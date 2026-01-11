import "./enviar.scss"
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import { useState } from "react";
import api from "../../axios.js"
import Cabecalho2 from "../../components/headerPages";

export default function EnviarAtividade() {
    const [nomeLicao, setNomeLicao] = useState('');
    const [materia, setMateria] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [carregando, setCarregando] = useState(false)
    const [nameUser, setNameUser] = useState('');
    const [token, setToken] = useState(localStorage.getItem("token"));
    
    async function Enviar() {
        if(!token){
            return alert("Faça login para enviar a atividade")
        }
        if (!nomeLicao || !materia || !descricao || !data) {
            return alert("Preencha todos os campos obrigatórios!");
        }
        
        try{
            const response = await api.post({
                username: nameUser,
                title: nomeLicao,
                description: descricao,
                materia: materia,
                data: data,
                token: token
            })
            setCarregando(true);
            alert("Atividade enviada!")
        } catch(error){
            alert(error.message)
        }
        
    }
    

    return (
        <main className="main-enviar">
            <Cabecalho2 nomePage="Enviar Lição" />

            <section className="page-enviar">
                <h3>Nome da Lição</h3>
                <input 
                    type="text" 
                    placeholder="Revolução Industrial" 
                    value={nomeLicao} 
                    onChange={e => setNomeLicao(e.target.value)} 
                    required
                />

                <h3>Descrição</h3>
                <input 
                    type="text" 
                    placeholder="Explicar o processo" 
                    value={descricao} 
                    onChange={e => setDescricao(e.target.value)} 
                    required
                />

                <h3>Data de entrega</h3>
                <input 
                    type="date" 
                    value={data} 
                    onChange={e => setData(e.target.value)} 
                    required
                />

                <h3>Nome da Matéria</h3>
                <input 
                    type="text" 
                    placeholder="História" 
                    value={materia} 
                    onChange={e => setMateria(e.target.value)} 
                    required
                />

                <button 
                    onClick={Enviar} 
                    disabled={carregando}
                    className={carregando ? 'loading' : ''}
                >
                    {carregando ? 'Enviando...' : 'Enviar Atividade'}
                </button>
            </section>
        </main>
    );
}