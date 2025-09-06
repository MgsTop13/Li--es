import "./enviar.scss";
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import { Link } from "react-router";
import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function EnviarAtividade() {
    const [nomeLicao, setNomeLicao] = useState('');
    const [materia, setMateria] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');

    async function EnviarAtividades() {
        const { data, error } = await supabase
            .from('licoes')
            .insert([{
                nm_licao: nomeLicao,
                descricao,
                data,
                nm_materia: materia
            }]);

        if (error) {
            console.error(error);
            alert("Falha ao enviar atividade");
        } else {
            console.log("Atividade inserida:", data);
            alert("Atividade enviada com sucesso!");
            setNomeLicao('');
            setMateria('');
            setDescricao('');
            setData('');
        }
    }

    return (
        <div>
            <main>
                <header>
                    <div className="PageAtualEnviar">
                        <h1>Enviar Atividade</h1>
                    </div>
                    <h3 className="Voltar">
                        <Link className="Link" to={"/"}>Voltar</Link>
                    </h3>
                </header>

                <section className="page">
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
        </div>
    );
}
