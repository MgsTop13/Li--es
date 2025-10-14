import "./enviar.scss";
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import { Link } from "react-router";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import Cabecalho2 from "../../components/headerPages";


export default function EnviarAtividade() {
    const [nomeLicao, setNomeLicao] = useState('');
    const [materia, setMateria] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');

    async function EnviarAtividades() {
    // Renomeie a variável 'data' da resposta do Supabase para 'response' (ou outro nome)
    const { data: response, error } = await supabase
        .from('licoes')
        .insert([{
            nm_licao: nomeLicao,
            descricao,
            // Esta linha agora se refere corretamente à variável de estado 'data'
            data,
            nm_materia: materia
        }]);

    if (error) {
        console.error(error);
        alert("Falha ao enviar atividade");
    } else {
        // Use o novo nome 'response' para acessar os dados do Supabase
        console.log("Atividade inserida:", response);
        alert("Atividade enviada com sucesso!");
        setNomeLicao('');
        setMateria('');
        setDescricao('');
        setData('');
    }
}

    return (
        
            <main className="main-enviar">
                <Cabecalho2
                    nomePage="Enviar Lição"
                />

                <section className="page-enviar">
                    <h3>Nome da Lição</h3>
                    <input type="text" placeholder="Revolução Industrial" value={nomeLicao} onChange={e => setNomeLicao(e.target.value)} />

                    <h3>Descrição</h3>
                    <input type="text" placeholder="Explicar o processo" value={descricao} onChange={e => setDescricao(e.target.value)} />

                    <h3>Data de entrega</h3>
                    <input type="date" value={data} onChange={e => setData(e.target.value)} />

                    <h3>Nome da Matéria</h3>
                    <input type="text" placeholder="História" value={materia} onChange={e => setMateria(e.target.value)} />

                    <button onClick={EnviarAtividades}>Enviar Atividades</button>
                </section>
            </main>
    );
}
