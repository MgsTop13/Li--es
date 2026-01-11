import "./home.scss";
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import { Link } from "react-router";
import { useState } from "react";
import api from "../../axios.js"

import Cabecalho1 from "../../components/headerHome";

export default function Home() {
    const [licao, setLicao] = useState([]);

    async function CarregarAtividades() {
        try{
            const response = await api.get("/CarregarLicoes")
            setLicao(response.data.atividades.data);
        } catch(error){
            return alert(error.message)
        }
    }

    return (
        <main className="main-home">
            <Cabecalho1 />

            <section className="page-home">

                {licao.map((item) => {
                    const dataFormatada = new Date(item.data_entrega).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    });  
                    return (
                        <section className="dados">
                            <h2>Matéria</h2>
                            <h3>{item.materia}</h3>
                            <h2>Título</h2>
                            <h3>{item.titulo_licao}</h3>
                            <h2>Descrição</h2>
                            <h3>{item.descricao_licao}</h3>
                            <h2>Dia de Entrega</h2>
                            <h3>{item.data_entrega}</h3>
                            <h2>Autor</h2>
                            <h3>{item.name}</h3>
                        </section>
                    );
                })}



            </section>
                <button onClick={CarregarAtividades}>Carregar Lições</button>
        </main>
    );
}
