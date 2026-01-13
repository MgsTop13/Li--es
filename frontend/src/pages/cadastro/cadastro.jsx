import "./cadastro.scss";
import { useNavigate } from "react-router";
import { useState } from "react";
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import api from "../../axios.js";
import Cabecalho2 from "../../components/headerPages";

export default function Cadastro() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [recuperacao, setRecuperacao] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    
    async function FazerC() {
        // Validação básica
        if (!name.trim() || !email.trim() || !password.trim() || !recuperacao.trim()) {
            setErro("Preencha todos os campos obrigatórios!");
            return;
        }

        

        setCarregando(true);
        setErro("");

        try {
            const response = await api.post("/Cadastro", {
                name,
                email,
                password,
                recuperacao
            });

            console.log("Resposta:", response.data);
            
            // Verifica diferentes estruturas de resposta
            const mensagemSucesso = response.data?.atividades?.message || 
                                  response.data?.message || 
                                  "Cadastro realizado com sucesso!";
            
            alert(mensagemSucesso);
            
            // Redireciona para login após 1.5 segundos
            setTimeout(() => {
                navigate("/Login");
            }, 1500);
            
        } catch(error) {
            console.error("Erro detalhado:", error);
            
            // Extrai mensagem de erro da resposta
            const mensagemErro = error.response?.data?.atividades?.error || 
                               error.response?.data?.error || 
                               error.response?.data?.message || 
                               "Erro ao cadastrar. Tente novamente.";
            
            setErro(mensagemErro);
            
        } finally {
            setCarregando(false);
        }
    }
    
    return (
        <main className="main-cadastro">
            <Cabecalho2 nomePage="Cadastro" />
            
            
            
            <section className="page-cadastro">
                {erro && <div className="erro">{erro}</div>}
                
                <h3>UserName</h3>
                <input
                    type="text"
                    placeholder="PedrinGemePlays"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={carregando}
                />
                
                <h3>E-mail</h3>
                <input
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={carregando}
                />
                
                <h3>Senha</h3>
                <input
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={carregando}
                />
                
                <h3>Palavra de Recuperação</h3>
                <input
                    type="text"
                    placeholder="Uma palavra para recuperar sua conta"
                    value={recuperacao}
                    onChange={(e) => setRecuperacao(e.target.value)}
                    required
                    disabled={carregando}
                />
                
                <button 
                    onClick={FazerC} 
                    disabled={carregando}
                >
                    {carregando ? "Cadastrando..." : "Fazer Cadastro"}
                </button>
                
                <p>
                    Já tem uma conta? 
                    <span onClick={() => navigate("/login")}> Faça login</span>
                </p>
            </section>
        </main>
    );
}