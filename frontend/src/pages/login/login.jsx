import "./login.scss";
import { useNavigate } from "react-router";
import { useState } from "react";
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import api from "../../axios.js";
import Cabecalho2 from "../../components/headerPages";

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    async function FazerLogin() {
        // Validação básica
        if (!username.trim() || !password.trim()) {
            setErro("Preencha todos os campos obrigatórios!");
            return;
        }

        setCarregando(true);
        setErro("");
        setSucesso("");

        try {
            const response = await api.post("/Login", {
                username,
                email,
                password
            });


            // Extrair token da resposta (ajuste conforme sua API)
            let token = "";
            
            // Tenta diferentes estruturas de resposta
            if (response.data?.atividades?.token) {
                token = response.data.atividades.token;
            } else if (response.data?.token) {
                token = response.data.token;
            } else if (response.data?.data?.token) {
                token = response.data.data.token;
            }

            // Verifica se o token foi recebido
            if (!token) {
                throw new Error("Token não recebido do servidor");
            }

            // Salva o token no localStorage
            localStorage.setItem("token", token);

            // Mensagem de sucesso
            const mensagemSucesso = response.data?.atividades?.message || 
                                  response.data?.message || 
                                  "Login realizado com sucesso!";
            
            setSucesso(mensagemSucesso);

            // Redireciona para home após 1.5 segundos
            setTimeout(() => {
                navigate("/");
            }, 1500);

        } catch(error) {
            console.error("Erro detalhado no login:", error);
            
            // Extrai mensagem de erro da resposta
            const mensagemErro = error.response?.data?.atividades?.error || 
                               error.response?.data?.error || 
                               error.response?.data?.message || 
                               "Usuário ou senha incorretos. Tente novamente.";
            
            setErro(mensagemErro);

            // Limpa token em caso de erro
            localStorage.removeItem("token");
            
        } finally {
            setCarregando(false);
        }
    }

    

    return (
        <main className="main-login">
            <Cabecalho2 nomePage="Login" />
            
            
            
            <section className="page-login">
                {erro && <div className="erro">{erro}</div>}
                {sucesso && <div className="sucesso">{sucesso}</div>}
                
                <h3>Username</h3>
                <input
                    type="text"
                    placeholder="PedrinGemePlays"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={carregando}
                />
                
                <h3>Email</h3>
                <input
                    type="text"
                    placeholder="teste@gmail.com"
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
                
                <button 
                    onClick={FazerLogin} 
                    disabled={carregando}
                >
                    {carregando ? "Entrando..." : "Fazer Login"}
                </button>

               
                
                <div className="links-extras">
                    <p>
                        Não tem uma conta? 
                        <span onClick={() => navigate("/Cadastro")}> Cadastre-se</span>
                    </p>
                    <p>
                        <span onClick={() => navigate("/recuperar")}>Esqueci minha senha</span>
                    </p>
                </div>
            </section>
        </main>
    );
}