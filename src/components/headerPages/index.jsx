import "./index.scss"
import { Link } from "react-router"

export default function Cabecalho2({nomePage}) {
    return (
        <header className="header2">
            <div className="PageAtualEnviar">
                <h1>{nomePage}</h1>
            </div>
            <h3 className="Voltar">
                <Link className="Link" to={"/"}>Voltar</Link>
            </h3>
        </header>
    )
}