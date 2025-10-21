import "./home.scss";
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import { Link } from "react-router";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import Cabecalho1 from "../../components/headerHome";

export default function Home() {
    const [licao, setLicao] = useState([]);

    async function CarregarAtividades() {
        const { data, error } = await supabase
            .from('licoes')
            .select('*');

        if (error) {
            alert('Error interno no servidor!')
            console.error(error);
        } else {
            setLicao(data);
        }
    }

    return (
        <main className="main-home">
            <Cabecalho1 />

            <section className="page-home">

                {licao.map((item, index) => {
                    const dataFormatada = new Date(item.data).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    });  
                    return (
                        <section key={index} className="dados">
                            <h2>Matéria</h2>
                            <h3>{item.nm_materia}</h3>
                            <h2>Título</h2>
                            <h3>{item.nm_licao}</h3>
                            <h2>Descrição</h2>
                            <h3>{item.descricao}</h3>
                            <h2>Dia de Entrega</h2>
                            <h3>{item.data}</h3>
                        </section>
                    );
                })}



            </section>
                <button onClick={CarregarAtividades}>Carregar Lições</button>
        </main>
    );
}
