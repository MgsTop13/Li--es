import "./acess.scss"
import { useState } from "react";
import api from "../../axios.js"

export default function Acess({ idUser, name, onClose }) {
    const [loading, setLoading] = useState(false);
    const [school, setSchool] = useState("benedito");
    const [chamados, setChamados] = useState([]);

    async function ListarAcessos() {
        setLoading(true);
        try {
            const response = await api.post("/ListAcess", {
                idUser: idUser
            })
            setChamados(response.data.banco.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function InserirAcesso() {
        setLoading(true);
        try {
            const response = await api.post("/InsertAcess", {
                idUser: idUser,
                name: name,
                school: school
            })
            console.log(response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="acess">
            <div className="text">
                <h1 className="pt1">{name}, você quer ter acesso a escola/curso</h1>
                <select
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                >
                    <option value="benedito">Benedito</option>
                    <option value="insf">Frei</option>
                </select>
                <h1 className="pt3">?</h1>
            </div>

            <div className="chamados">
                {chamados.map((chamado) => {
                    return (
                        <section className="chamado" key={`${chamado.id_acess}`}>
                            <div className="pt1">
                                <h2>Escola</h2>
                                <h3>{chamado.salapermissao}</h3>
                            </div>
                            <div className="pt2">
                                <h2>Status</h2>
                                <h3>{chamado.status}</h3>
                            </div>
                        </section>
                    );
                })}
            </div>

            <div className="botoes">
                <button onClick={InserirAcesso}>Pedir Acesso</button>
                <button onClick={onClose}>Fechar</button>
                <button onClick={ListarAcessos}>Listar Acessos</button>
            </div>

        </div>
    )
}