import "./benedito.scss";
import "../../../scss/global.scss";
import "../../../scss/fonts.scss";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import api from "../../../axios.js"
import { useNavigate, useLocation } from "react-router";
import Cabecalho2 from "../../../components/headerPages/index.jsx";
import Add from "../../../components/add/add.jsx";
import Del from "../../../components/del/del.jsx";

export default function Benedito() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [licao, setLicao] = useState([]);
    const [aprovado, setAprovado] = useState()
    const [page, setPage] = useState('')
    const [modalAdd, setModalAdd] = useState(false)
    const [modalDel, setModalDel] = useState(null)
    
    const navigate = useNavigate();
    const url = useLocation();

    function dividir() {
        const pageAtual = url.pathname;
        setPage(pageAtual.slice(1))
    }

    async function CarregarLicoes() {
        try {
            const response = await api.get(`/CarregarLicoes/${page}`);
            setLicao(response.data.atividades.data)
        } catch (error) {
            console.error(error);
        }
    }

    async function decodeToken() {
        try {
            const response = await api.post("/TestarToken", {
                token
            })
            const format = response.data.dados.benedito
            if (format === false) {
                alert("Você não tem permissão!")
                return navigate('/');
            }
            setAprovado(format)
        } catch (error) {
            console.error(error)
        }
        await CarregarLicoes() 
        if (licao == [] || licao.length == 0) {
            return alert("Nenhuma atividade salva!")
        }
    }

    useEffect(() => {
        dividir();
    }, [url.pathname])

    function ShowmodalAdd() {
        setModalAdd(prev => !prev);
    }

    const closemodalAdd = () => {
        setModalAdd(false)
    }

    const ShowModalDel = (id) => {
        setModalDel(id)
        //setModalDel(prev => !prev);
    }
    
    const closeModalDel = () => {
        setModalDel(null)
    }

    useEffect(() => {
        if (!token) {
            alert("Faça login 1º")
            navigate("/login")
        }
    }, [navigate])

    useEffect(() => {
        if (page){
            decodeToken();
            CarregarLicoes();
        }
    }, [page])

    return (
        <main className="benedito">
            <Cabecalho2
                nomePage={`${page}`}
            />

            <section className={`licoes ${modalAdd || modalDel ? "modalAddAberto" : "modalAddFechado"}`} >
                {licao.map((licao) => {
                    const dataFormatada = new Date(licao.data_entrega).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    });
                    return (
                        <section className="dados" key={licao.id_licao}>
                            <h2>Titulo</h2>
                            <h3>{licao.titulo_licao}</h3>
                            <h2>Descrição</h2>
                            <h3>{licao.descricao_licao}</h3>
                            <h2>Matéria</h2>
                            <h3>{licao.materia}</h3>
                            <h2>Data de entrega</h2>
                            <h3>{dataFormatada}</h3>
                            <h2>Autor</h2>
                            <h3>{licao.name}</h3>
                            <div className="remover" onClick={() => ShowModalDel(licao.titulo_licao)}>
                                <h5>{modalDel ? "Fechar" : "Remover"}</h5>
                            </div>
                        </section>
                    )
                })}
            </section>
            <div className="botoes">
                <button onClick={decodeToken && CarregarLicoes}>Carregar lições</button>
                <button onClick={ShowmodalAdd}>
                    {modalAdd ? "Fechar" : "Adicionar Lição"}
                </button>
            </div>
            {modalAdd && (
                <Add
                    onClose={closemodalAdd}
                    school={page}
                />
            )}
            {modalDel && (
                <Del
                    onClose={closeModalDel}
                    nameLicao={modalDel}
                />
            )}
        </main>
    )
}