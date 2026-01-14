import "./index.scss";
import { Link } from "react-router";

export default function Cabecalho1() {
    return (
        <header className="header1">
            <div className="links1">
            <h3>
                <Link className="Link" to={"/EnviarAtividade"}>Enviar Atividade
                </Link>
            </h3>
            <h3 className="RemoverAtividade">
                <Link className="Link" to={"/RemoverAtivLoginidade"}>Remover Atividades
                </Link>
            </h3>
            </div>
            <div className="PageAtualHome">
                <h1>Home</h1>
            </div>
             <div className="links2">
             
            <h3 className="Login">
                <Link className="Link" to={"/Login"}>Login
                </Link>
            </h3>
             <h3 className="Login">
                <a href="https://darkmodde.xyz/" target="_blank">Scripts</a>
            </h3>
            </div>
        </header>
    )
}