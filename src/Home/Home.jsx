import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [estoque, setEstoque] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEstoque();
    }, []);

    const fetchEstoque = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://estoque-backend-hxfb.onrender.com/estoque/resumo');
            const data = await response.json();
            
            if (data.success) {
                setEstoque(data.byName || {});
            } else {
                setError('Erro ao carregar estoque');
            }
        } catch (err) {
            setError('Erro de conexão com o servidor');
            console.error('Erro ao buscar estoque:', err);
        } finally {
            setLoading(false);
        }
    };

    const getQuantidadeTamanho = (nomeProduto, tamanho) => {
        const produto = estoque[nomeProduto];
        if (!produto) return 0;
        return produto[tamanho] || 0;
    };

    const getTotalProduto = (nomeProduto) => {
        const produto = estoque[nomeProduto];
        if (!produto) return 0;
        return produto.total || 0;
    };

    if (loading) {
        return (
            <div className="home-container">
                <div className="loading">Carregando estoque...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="home-container">
                <div className="error">
                    {error}
                    <button onClick={fetchEstoque} className="retry-btn">
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="home-container">
            <h1>bom dia, Vladia!</h1>
            <div className="lista-colunas">
                <button onClick={() => navigate('/ColantRosa')} className="coluna-btn btn-com-tamanhos">
                    <div className="btn-content">
                        <h2>Colant Rosa</h2>
                    </div>
                    <div className="btn-tamanhos">
                        <span>P-{getQuantidadeTamanho('Collant Rosa', 'P')}</span>
                        <span>M-{getQuantidadeTamanho('Collant Rosa', 'M')}</span>
                        <span>G-{getQuantidadeTamanho('Collant Rosa', 'G')}</span>
                        <span>GG-{getQuantidadeTamanho('Collant Rosa', 'GG')}</span>
                    </div>
                </button>

                <button onClick={() => navigate('/ColantBasicoInfantil')} className="coluna-btn btn-com-tamanhos">
                    <div className="btn-content">
                        <h2>Colant básico infantil</h2>
                    </div>
                    <div className="btn-tamanhos">
                        <span>P-{getQuantidadeTamanho('Collant Básico Infantil', 'P')}</span>
                        <span>M-{getQuantidadeTamanho('Collant Básico Infantil', 'M')}</span>
                        <span>G-{getQuantidadeTamanho('Collant Básico Infantil', 'G')}</span>
                        <span>GG-{getQuantidadeTamanho('Collant Básico Infantil', 'GG')}</span>
                    </div>
                </button>

                <button onClick={() => navigate('/ColantBasicoAdulto')} className="coluna-btn btn-com-tamanhos">
                    <div className="btn-content">
                        <h2>Colant básico adulto</h2>
                    </div>
                    <div className="btn-tamanhos">
                        <span>P-{getQuantidadeTamanho('Collant Básico Adulto', 'P')}</span>
                        <span>M-{getQuantidadeTamanho('Collant Básico Adulto', 'M')}</span>
                        <span>G-{getQuantidadeTamanho('Collant Básico Adulto', 'G')}</span>
                        <span>GG-{getQuantidadeTamanho('Collant Básico Adulto', 'GG')}</span>
                    </div>
                </button>

                <button onClick={() => navigate('/ColantPreliminarInfantil')} className="coluna-btn btn-com-tamanhos">
                    <div className="btn-content">
                        <h2>Colant preliminar infantil</h2>
                    </div>
                    <div className="btn-tamanhos">
                        <span>P-{getQuantidadeTamanho('Collant Preliminar Infantil', 'P')}</span>
                        <span>M-{getQuantidadeTamanho('Collant Preliminar Infantil', 'M')}</span>
                        <span>G-{getQuantidadeTamanho('Collant Preliminar Infantil', 'G')}</span>
                        <span>GG-{getQuantidadeTamanho('Collant Preliminar Infantil', 'GG')}</span>
                    </div>
                </button>

                <button onClick={() => navigate('/ColantPreliminarAdulto')} className="coluna-btn btn-com-tamanhos">
                    <div className="btn-content">
                        <h2>Colant preliminar adulto</h2>
                    </div>
                    <div className="btn-tamanhos">
                        <span>P-{getQuantidadeTamanho('Collant Preliminar Adulto', 'P')}</span>
                        <span>M-{getQuantidadeTamanho('Collant Preliminar Adulto', 'M')}</span>
                        <span>G-{getQuantidadeTamanho('Collant Preliminar Adulto', 'G')}</span>
                        <span>GG-{getQuantidadeTamanho('Collant Preliminar Adulto', 'GG')}</span>
                    </div>
                </button>

                <button onClick={() => navigate('/Redinha')} className="coluna-btn">
                    <h2>Redinha</h2>
                    <h4>{getTotalProduto('Redinha')} total</h4>
                </button>

                <button onClick={() => navigate('/Adereco')} className="coluna-btn">
                    <h2>Adereço</h2>
                    <h4>{getTotalProduto('Adereço')} total</h4>
                </button>

                <button onClick={() => navigate('/SapatilhaRosa')} className="coluna-btn">
                    <h2>Sapatilha rosa</h2>
                    <h4>{getTotalProduto('Sapatilha Rosa')} total</h4>
                </button>

                <button onClick={() => navigate('/SapatilhaPreta')} className="coluna-btn">
                    <h2>Sapatilha preta</h2>
                    <h4>{getTotalProduto('Sapatilha Preta')} total</h4>
                </button>

                <button onClick={() => navigate('/MeiaInfantil')} className="coluna-btn">
                    <h2>Meia infantil</h2>
                    <h4>{getTotalProduto('Meia Infantil')} total</h4>
                </button>

                <button onClick={() => navigate('/MeiaAdulto')} className="coluna-btn">
                    <h2>Meia Adulto</h2>
                    <h4>{getTotalProduto('Meia Adulto')} total</h4>
                </button>
            </div>
        </div>
    );
}

export default Home;