import "./images.scss";
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import Cabecalho2 from "../../components/headerPages";

export default function EnviarImagem() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagem, setImagem] = useState(null);
    const [imagemPreview, setImagemPreview] = useState('');
    const [carregando, setCarregando] = useState(false);

    // Manipular seleção de imagem
    function handleImagemSelecionada(e) {
        const file = e.target.files[0];
        if (file) {
            // Validar tipo de arquivo
            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecione apenas imagens!');
                return;
            }

            // Validar tamanho (5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('A imagem deve ter no máximo 5MB!');
                return;
            }

            setImagem(file);
            
            // Criar preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagemPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }

    async function uploadImagem(file) {
    const formData = new FormData();
    formData.append('imagem', file);

    // URL dinâmica para produção/desenvolvimento
    const baseUrl = window.location.origin; // Isso pega https://li-es.onrender.com
    const response = await fetch(`${baseUrl}/api/upload`, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    
    if (!data.success) {
        throw new Error(data.error);
    }

    return data.imageUrl; // Isso retorna algo como '/public/storage/lousas/arquivo.jpg'
}

    async function EnviarImagem() {
        if (!titulo || !descricao || !categoria || !imagem) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        setCarregando(true);

        try {
            // Fazer upload da imagem
            const imagemUrl = await uploadImagem(imagem);

            // Inserir na tabela 'Imagens' do Supabase
            const { data: response, error } = await supabase
                .from('Imagens')
                .insert([{
                    titulo: titulo,
                    descricao: descricao,
                    categoria: categoria,
                    img_url: imagemUrl, // URL da imagem
                    data_upload: new Date().toISOString().split('T')[0]
                }]);

            if (error) {
                console.error(error);
                alert("Falha ao enviar imagem");
            } else {
                console.log("Imagem inserida:", response);
                alert("Imagem enviada com sucesso!");
                
                // Limpar formulário
                setTitulo('');
                setDescricao('');
                setCategoria('');
                setImagem(null);
                setImagemPreview('');
            }
        } catch (error) {
            console.error("Erro no upload:", error);
            alert("Erro ao fazer upload da imagem: " + error.message);
        } finally {
            setCarregando(false);
        }
    }

    function removerImagem() {
        setImagem(null);
        setImagemPreview('');
    }

    return (
        <main className="main-enviar-imagem">
            <Cabecalho2 nomePage="Enviar Imagem" />

            <section className="page-enviar-imagem">
                <h2>Enviar Nova Imagem</h2>
                
                <div className="form-group">
                    <h3>Título da Imagem *</h3>
                    <input 
                        type="text" 
                        placeholder="Ex: Lousa de Matemática Aula 1" 
                        value={titulo} 
                        onChange={e => setTitulo(e.target.value)} 
                        required
                    />
                </div>

                <div className="form-group">
                    <h3>Descrição *</h3>
                    <textarea 
                        placeholder="Descreva o conteúdo da imagem..." 
                        value={descricao} 
                        onChange={e => setDescricao(e.target.value)} 
                        rows="4"
                        required
                    />
                </div>

                <div className="form-group">
                    <h3>Categoria *</h3>
                    <select 
                        value={categoria} 
                        onChange={e => setCategoria(e.target.value)}
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        <option value="matematica">Matemática</option>
                        <option value="historia">História</option>
                        <option value="portugues">Português</option>
                        <option value="ciencias">Ciências</option>
                        <option value="geografia">Geografia</option>
                        <option value="ingles">Inglês</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>

                <div className="form-group">
                    <h3>Imagem da Lousa *</h3>
                    <div className="upload-area">
                        {!imagemPreview ? (
                            <label className="upload-label">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImagemSelecionada}
                                    style={{ display: 'none' }}
                                />
                                <div className="upload-placeholder">
                                    <div className="upload-icon">📷</div>
                                    <div className="upload-text">
                                        Clique para selecionar uma imagem
                                    </div>
                                    <div className="upload-subtext">
                                        Formatos: JPG, PNG, GIF (Max: 5MB)
                                    </div>
                                </div>
                            </label>
                        ) : (
                            <div className="image-preview">
                                <div className="preview-header">
                                    <span>Pré-visualização:</span>
                                    <button type="button" onClick={removerImagem} className="remove-btn">
                                        ✕ Remover
                                    </button>
                                </div>
                                <img src={imagemPreview} alt="Preview da imagem" />
                                <div className="image-info">
                                    <strong>Arquivo:</strong> {imagem.name}
                                    <br />
                                    <strong>Tamanho:</strong> {(imagem.size / 1024 / 1024).toFixed(2)} MB
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <button 
                    onClick={EnviarImagem} 
                    disabled={carregando || !imagem}
                    className={`enviar-btn ${carregando ? 'loading' : ''}`}
                >
                    {carregando ? 'Enviando Imagem...' : 'Enviar Imagem'}
                </button>
            </section>
        </main>
    );
}