import "./index.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Cabecalho1({ admina }) {
    const [admin, setAdmin] = useState(false);

    function VerfADM() {
        if (admina === true) {
            setAdmin(true)
        }
        else {
            setAdmin(false)
        }
    }

    useEffect(() => {
        VerfADM();
    }, [admina]);


    return (
        <header className="header1">
            <h3 className="login">
                <Link className="Link" to={"/Login"}>Login</Link>
            </h3>
            <div className="PageAtualHome">
                <h1>Home</h1>
            </div>

            {admin && (
                <h3 className="login">
                    <Link className="Link" to={"/Administrator"}>Administradores</Link>
                </h3>
            )}
        </header>
    )
}