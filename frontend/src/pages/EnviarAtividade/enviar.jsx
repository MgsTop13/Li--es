import "./enviar.scss"
import "../../scss/global.scss";
import "../../scss/fonts.scss";
import { useState } from "react";
import { supabase } from "../../supabaseClient";
import Cabecalho2 from "../../components/headerPages";

export default function EnviarAtividade() {
    const [nomeLicao, setNomeLicao] = useState('');
    const [materia, setMateria] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
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

        const response = await fetch('http://localhost:5010/api/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error);
        }

        return data.imageUrl;
    }

    async function EnviarAtividades() {
        if (!nomeLicao || !materia || !descricao || !data) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        setCarregando(true);

        try {
            let imagemUrl = '';

            // Se houver imagem, fazer upload
            if (imagem) {
                imagemUrl = await uploadImagem(imagem);
            }

            // Inserir no Supabase
            const { data: response, error } = await supabase
                .from('licoes')
                .insert([{
                    nm_licao: nomeLicao,
                    descricao,
                    data,
                    nm_materia: materia,
                    foto_lousa: imagemUrl // URL da imagem
                }]);

            if (error) {
                console.error(error);
                alert("Falha ao enviar atividade");
            } else {
                console.log("Atividade inserida:", response);
                alert("Atividade enviada com sucesso!");
                
                // Limpar formulário
                setNomeLicao('');
                setMateria('');
                setDescricao('');
                setData('');
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
        <main className="main-enviar">
            <Cabecalho2 nomePage="Enviar Lição" />

            <section className="page-enviar">
                <h3>Nome da Lição *</h3>
                <input 
                    type="text" 
                    placeholder="Revolução Industrial" 
                    value={nomeLicao} 
                    onChange={e => setNomeLicao(e.target.value)} 
                    required
                />

                <h3>Descrição *</h3>
                <input 
                    type="text" 
                    placeholder="Explicar o processo" 
                    value={descricao} 
                    onChange={e => setDescricao(e.target.value)} 
                    required
                />

                <h3>Data de entrega *</h3>
                <input 
                    type="date" 
                    value={data} 
                    onChange={e => setData(e.target.value)} 
                    required
                />

                <h3>Nome da Matéria *</h3>
                <input 
                    type="text" 
                    placeholder="História" 
                    value={materia} 
                    onChange={e => setMateria(e.target.value)} 
                    required
                />

                <h3>Foto da Lousa (Opcional)</h3>
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
                                📷 Clique para adicionar foto da lousa
                                <br />
                                <small>Formatos: JPG, PNG, GIF (Max: 5MB)</small>
                            </div>
                        </label>
                    ) : (
                        <div className="image-preview">
                            <img src={imagemPreview} alt="Preview da lousa" />
                            <button type="button" onClick={removerImagem} className="remove-btn">
                                ✕ Remover
                            </button>
                        </div>
                    )}
                </div>

                <button 
                    onClick={EnviarAtividades} 
                    disabled={carregando}
                    className={carregando ? 'loading' : ''}
                >
                    {carregando ? 'Enviando...' : 'Enviar Atividades'}
                </button>
            </section>
        </main>
    );
}