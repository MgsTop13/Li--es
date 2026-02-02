import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home/home"
import Cadastro from "./pages/cadastro/cadastro"
import Login from "./pages/login/login"
import Benedito from "./pages/school/benedito/benedito";
import Insf from "./pages/school/insf/insf";
import Admin from "./pages/admin/admin";
export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/insf" element={<Insf/>} />
                <Route path="/Login" element={<Login />} />
                <Route path="/benedito" element={<Benedito/>} />
                <Route path="/Cadastro" element={<Cadastro />} />
                <Route path="/Administrator" element={<Admin />} />    
            </Routes>
        </BrowserRouter>
    )
}