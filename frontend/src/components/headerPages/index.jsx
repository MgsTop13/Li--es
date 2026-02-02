import "./index.scss"
import { useEffect, useState } from "react"
import { Link } from "react-router"

export default function Cabecalho2({nomePage}) {
    const [verf, setVerf] = useState(false);

    function VerfBenedito(){
        if(nomePage === "benedito"){
            setVerf(true)
        } else{
            setVerf(false)
        }
    }

    useEffect(() => {
        VerfBenedito();
    }, [nomePage])

    return (
        <header className={`header2`}>
            {verf && (
                <h3 className="Login">
                    <a href="https://darkmodde.xyz/" target="_blank">Scripts</a>
                </h3>
            )}
            
            <div className={`PageAtualEnviar ${verf ? "benedito2": "nbenedito2"}`}>
                <h1>{nomePage}</h1>
            </div>
            <h3 className="Voltar">
                <Link className="Link" to={"/"}>Voltar</Link>
            </h3>
        </header>
    )
}