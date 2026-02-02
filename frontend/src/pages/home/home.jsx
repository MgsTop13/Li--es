import "./home.scss";
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import api from "../../axios.js"
import Cabecalho1 from "../../components/headerHome";
import Acess from "../../components/acess/acess.jsx";


export default function Home() {
    const [escola, setEscola] = useState([]);
    const [modal, setModal] = useState(false);
    const [user, setUser] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"))

    async function CarregarEscolas() {
        try {
            const response = await api.get("/CarregarEscolas")
            setEscola(response.data.escolas.data);
        } catch (error) {
            return console.error(error)
        }
    }

    async function decodeToken() {
        try {
            const response = await api.post("/TestarToken", {
                token
            })
            const format = response.data.dados
            setUser(format)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (escola.length >= 1) {
            return
        } else {
            CarregarEscolas()
        }
        decodeToken()

    }, [CarregarEscolas])

    function Funcionamento() {
        alert("Caso demorar por mais de 5 minutos, contate o ADM para solucionar errors!")
        alert(`Para acessar as escolas, clique ao botão de "Pedir acesso" e aguarde 2 dias ou contate ao ADM`)
    }

    function ShowModal() {
        setModal(!modal);
    }

    return (
        <main className={`main-home`}>
            <Cabecalho1
                admina={user.ComunidadeTop}
            />

            <section className={`page-home ${modal ? "open": "close"}`}>
                {escola.map((item) => {
                    return (
                        <Link className="link" key={item.id_escola} to={`/${item.name_school}`}>
                            <section className="dados" id={`${item.id_escola}`}>
                                <h2>Escola</h2>
                                <h3>{item.name_school}</h3>
                            </section>
                        </Link>
                    );
                })}

            </section>
            <div className="botoes">
                <button onClick={Funcionamento}>Dúvidas</button>
                <button onClick={ShowModal}>{modal ? "Fechar" : "Pedir acesso"}</button>
            </div>
            {modal && (
                <Acess
                    idUser={user.role}
                    name={user.name}
                    onClose={ShowModal}
                />
            )}
        </main>
    );
}
