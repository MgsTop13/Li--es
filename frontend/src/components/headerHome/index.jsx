import "./index.scss";
import { Link } from "react-router";

export default function Cabecalho1() {
    return (
        <header className="header1">
            <h3><Link className="Link" to={"EnviarAtividade"}>Enviar Atividade</Link></h3>
            <h3><Link className="Link" to={"ImagensCarregadas"}>Inserir Img</Link></h3>
            <div className="PageAtualHome"><h1>Home</h1></div>
            <h3><Link className="Link" to={"VerImagens"}>Listar Img</Link></h3>
            <h3 className="RemoverAtividade"><Link className="Link" to={"RemoverAtividade"}>Remover Atividades</Link></h3>
        </header>
    )
}