import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/home"
import EnviarAtividades from "./pages/EnviarAtividade/enviar"
import RemoverAtividades from "./pages/RemoverAtividade/remover"
import EnviarImagem from "./pages/InserirImg/images";
import VerImagens from "./pages/ListarImg/ListImg";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/EnviarAtividade" element={<EnviarAtividades />} />
                <Route path="/RemoverAtividade" element={<RemoverAtividades />} />
                <Route path="/ImagensCarregadas" element={<EnviarImagem />} />
                <Route path="/VerImagens" element={<VerImagens />} />
            </Routes>
        </BrowserRouter>
    )
}