import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/home"
import EnviarAtividades from "./pages/EnviarAtividade/enviar"
import RemoverAtividades from "./pages/RemoverAtividade/remover"
import Cadastro from "./pages/cadastro/cadastro"
import Login from "./pages/login/login"

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Cadastro" element={<Cadastro />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/EnviarAtividade" element={<EnviarAtividades />} />
                <Route path="/RemoverAtividade" element={<RemoverAtividades />} />
                
            </Routes>
        </BrowserRouter>
    )
}