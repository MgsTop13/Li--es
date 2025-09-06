import "./remover.scss";
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import { Link } from "react-router";
import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function RemoverAtividade() {
    const [id2, setId2] = useState('');

    async function RemoverAtividades() {
        const { data, error } = await supabase
            .from('licoes')
            .delete()
            .eq('id', id2);

        if (error) {
            console.error(error);
            alert("Falha ao deletar atividade");
        } else {
            console.log("Atividade removida:", data);
            alert("Atividade removida com sucesso!");
            setId2('');
        }
    }

    return (
        <div>
            <main>
                <header>
                    <div className="PageAtualRemover">
                        <h1>Deletar Atividades</h1>
                    </div>
                    <h3><Link className="Link" to={"/"}>Voltar</Link></h3>
                </header>

                <section className="page">
                    <h3>ID da lição</h3>
                    <input type="text" placeholder="7" value={id2} onChange={e => setId2(e.target.value)} />
                    <button onClick={RemoverAtividades}>Remover Atividade</button>
                </section>
            </main>
        </div>
    );
}
