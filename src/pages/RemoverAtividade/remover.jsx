import "./remover.scss";
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import { Link } from "react-router";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import Cabecalho2 from "../../components/headerPages";
export default function RemoverAtividade() {
    const [id2, setId2] = useState('');
    const [name, setName] = useState('');

    async function RemoverAtividades() {
        const { data, error } = await supabase
            .from('licoes')
            .delete()
            .eq('nm_licao', name) || ('id2', id2);

        if (error) {
            console.error(error);
            alert("Falha ao deletar atividade");
        } else {
            console.log("Atividade removida:", data);
            alert("Atividade removida com sucesso!");
            setId2('');
            setName('');
        }
    }

    return (
        <main className="main-remover">
            <Cabecalho2 
                nomePage="Remover Lição"
            />
            <section className="page-remover">
                <h3>ID da lição</h3>
                <input type="text" placeholder="7" value={id2} onChange={e => setId2(e.target.value)} />
                <input type="text" placeholder="Historia" value={name} onChange={e => setName(e.target.value)} />
                <button onClick={RemoverAtividades}>Remover Atividade</button>
            </section>
        </main>
    );
}
