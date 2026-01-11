import "./remover.scss";
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import { Link } from "react-router";
import { useState } from "react";

import Cabecalho2 from "../../components/headerPages";


export default function RemoverAtividade() {
    const [name, setName] = useState('');

    

    return (
        <main className="main-remover">
            <Cabecalho2 
                nomePage="Remover Lição"
            />
            <section className="page-remover">
                
                <input type="text" 
                    placeholder="Historia" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <button>Remover Atividade</button>
            </section>
        </main>
    );
}
