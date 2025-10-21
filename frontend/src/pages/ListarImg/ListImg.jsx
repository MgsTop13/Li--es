import "./ListImg.scss";
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import Cabecalho2 from "../../components/headerPages";

export default function VerImagens() {
    const [imagens, setImagens] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [filtroCategoria, setFiltroCategoria] = useState('');

    // Buscar imagens do banco de dados
    async function buscarImagens() {
        try {
            setCarregando(true);

            let query = supabase
                .from('Imagens')
                .select('*')
                .order('created_at', { ascending: false });

            // Aplicar filtro se existir
            if (filtroCategoria) {
                query = query.eq('categoria', filtroCategoria);
            }

            const { data, error } = await query;

            if (error) {
                console.error("Erro ao buscar imagens:", error);
                alert("Erro ao carregar imagens");
            } else {
                setImagens(data || []);
            }
        } catch (error) {
            console.error("Erro:", error);
        } finally {
            setCarregando(false);
        }
    }

    // Buscar imagens quando o componente carregar ou o filtro mudar
    useEffect(() => {
        buscarImagens();
    }, [filtroCategoria]);

    // Função para deletar imagem
    async function deletarImagem(id, titulo) {
        if (!confirm(`Tem certeza que deseja deletar a imagem "${titulo}"?`)) {
            return;
        }

        try {
            const { error } = await supabase
                .from('imagens')
                .delete()
                .eq('id', id);

            if (error) {
                console.error("Erro ao deletar:", error);
                alert("Erro ao deletar imagem");
            } else {
                alert("Imagem deletada com sucesso!");
                buscarImagens(); // Recarregar a lista
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao deletar imagem");
        }
    }

    // Obter categorias únicas para o filtro
    const categoriasUnicas = [...new Set(imagens.map(img => img.categoria))];

    return (
        <main className="main-ver-imagens">
            <Cabecalho2 nomePage="Imagens Carregadas" />

            <section className="page-ver-imagens">
                <div className="header-imagens">
                    <h2>Imagens Carregadas</h2>

                    {/* Filtro por categoria */}
                    <div className="filtros">
                        <select
                            value={filtroCategoria}
                            onChange={e => setFiltroCategoria(e.target.value)}
                            className="filtro-categoria"
                        >
                            <option value="">Todas as categorias</option>
                            {categoriasUnicas.map(categoria => (
                                <option key={categoria} value={categoria}>
                                    {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                                </option>
                            ))}
                        </select>

                        <span className="contador">
                            {imagens.length} imagem{imagens.length !== 1 ? 's' : ''} encontrada{imagens.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>

                {carregando ? (
                    <div className="carregando">
                        <div className="spinner"></div>
                        <p>Carregando imagens...</p>
                    </div>
                ) : imagens.length === 0 ? (
                    <div className="sem-imagens">
                        <div className="icone">📷</div>
                        <h3>Nenhuma imagem encontrada</h3>
                        <p>
                            {filtroCategoria
                                ? `Nenhuma imagem na categoria "${filtroCategoria}"`
                                : "Ainda não há imagens carregadas. Seja o primeiro a enviar!"
                            }
                        </p>
                    </div>
                ) : (
                    <div className="grid-imagens">
                        {imagens.map(imagem => (
                            <div key={imagem.id} className="card-imagem">
                                <div className="imagem-container">
                                    <img
                                        src={imagem.img_url} // Já é caminho relativo: '/public/storage/lousas/arquivo.jpg'
                                        alt={imagem.titulo}
                                        onError={(e) => {
                                            e.target.src = '/placeholder-image.png'; // Ou usar um fallback local
                                            e.target.alt = 'Imagem não carregada';
                                        }}
                                    />
                                </div>

                                <div className="info-imagem">
                                    <h3 className="titulo-imagem">{imagem.titulo}</h3>
                                    <p className="descricao-imagem">{imagem.descricao}</p>

                                    <div className="meta-imagem">
                                        <span className="categoria-badge">
                                            {imagem.categoria}
                                        </span>
                                        <span className="data-imagem">
                                            {new Date(imagem.data_upload).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>

                                    <div className="acoes-imagem">
                                        <button
                                            className="btn-visualizar"
                                            onClick={() => window.open(imagem.img_url, '_blank')}
                                        >
                                            🔍 Ampliar
                                        </button>
                                        <button
                                            className="btn-deletar"
                                            onClick={() => deletarImagem(imagem.id, imagem.titulo)}
                                        >
                                            🗑️ Deletar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}