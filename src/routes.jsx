import {BrowserRouter, Routes, Route} from "react-router";
import Home from "./pages/home/home"
import EnviarAtividades from "./pages/EnviarAtividade/enviar"
import RemoverAtividades from "./pages/RemoverAtividade/remover"

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home /> } />
                <Route path="/EnviarAtividade" element={ <EnviarAtividades />} />
                <Route path="/RemoverAtividade" element={ <RemoverAtividades />} />
            </Routes>
        </BrowserRouter>
    )
}