import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gerenciamento.css';

function Gerenciamento() {
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
            const response = await fetch('http://localhost:3001/estoque/resumo');
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
        <div className="gerenciamento-container">
            <div className='gerenciamento'>
                <h1>Vamos ao trabalho!</h1>
                <p>Gerenciamento de vendas Mensais da Vladia</p>
                <button style={{marginTop: '1rem'}} className='btn-gerenciamento'>
                    Gerenciar
                </button>
            </div>
            <div className="lista-colunas">
                <button onClick={() => navigate('/GColantBasicoInfantil')} className="coluna-btn-gerenciamento btn-com-tamanhos">
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

                <button onClick={() => navigate('/GColantBasicoAdulto')} className="coluna-btn-gerenciamento btn-com-tamanhos">
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

                <button onClick={() => navigate('/GColantPreliminarInfantil')} className="coluna-btn-gerenciamento btn-com-tamanhos">
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

                <button onClick={() => navigate('/GColantPreliminarAdulto')} className="coluna-btn-gerenciamento btn-com-tamanhos">
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

                <button onClick={() => navigate('/GRedinha')} className="coluna-btn-gerenciamento">
                    <h2>Redinha</h2>
                    <h4>{getTotalProduto('Redinha')} total</h4>
                </button>

                <button  onClick={() => navigate('/GAdereco')} className="coluna-btn-gerenciamento">
                    <h2>Adereço</h2>
                    <h4>{getTotalProduto('Adereço')} total</h4>
                </button>

                <button onClick={() => navigate('/GSapatilhaRosa')} className="coluna-btn-gerenciamento">
                    <h2>Sapatilha rosa</h2>
                    <h4>{getTotalProduto('Sapatilha Rosa')} total</h4>
                </button>

                <button onClick={() => navigate('/GSapatilhaPreta')} className="coluna-btn-gerenciamento">
                    <h2>Sapatilha preta</h2>
                    <h4>{getTotalProduto('Sapatilha Preta')} total</h4>
                </button>

                <button onClick={() => navigate('/GMeiaInfantil')} className="coluna-btn-gerenciamento">
                    <h2>Meia infantil</h2>
                    <h4>{getTotalProduto('Meia Infantil')} total</h4>
                </button>

                <button onClick={() => navigate('/GMeiaAdulto')} className="coluna-btn-gerenciamento">
                    <h2>Meia Adulto</h2>
                    <h4>{getTotalProduto('Meia Adulto')} total</h4>
                </button>
            </div>
        </div>
    );
}

export default Gerenciamento;