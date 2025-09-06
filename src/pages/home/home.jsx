import "./home.scss";
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import { Link } from "react-router";
import { useState } from "react";
import { supabase } from "../../supabaseClient";

export default function Home() {
    const [licao, setLicao] = useState([]);

    async function CarregarAtividades() {
        const { data, error } = await supabase
            .from('licoes')
            .select('*');

        if (error) {
            console.error(error);
        } else {
            setLicao(data);
        }
    }

    return (
        <div>
            <main>
                <header>
                    <h3><Link className="Link" to={"EnviarAtividade"}>Enviar Atividade</Link></h3>
                    <div className="PageAtualHome"><h1>Home</h1></div>
                    <h3 className="RemoverAtividade"><Link className="Link" to={"RemoverAtividade"}>Remover Atividades</Link></h3>
                </header>

                <section className="page">
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Matéria</th>
                                    <th>Descrição</th>
                                    <th>Data de Entrega</th>
                                    <th>ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {licao.map((item, index) => {
                                    const dataFormatada = new Date(item.data).toLocaleDateString("pt-BR", {
                                        year: "numeric",
                                        month: "2-digit",
                                        day: "2-digit"
                                    });
                                    return (
                                        <tr key={index}>
                                            <td>{item.nm_materia}</td>
                                            <td>{item.descricao}</td>
                                            <td>{dataFormatada}</td>
                                            <td>{item.id}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <button onClick={CarregarAtividades}>Carregar Lições</button>
                </section>
            </main>
        </div>
    );
}
