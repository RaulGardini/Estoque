import React, { useState, useEffect } from 'react';
import './GEstoque.css';
import { useNavigate } from 'react-router-dom';

function GColantBasicoAdulto() {
    const navigate = useNavigate();

    const [estoque, setEstoque] = useState({
        P: 0,
        M: 0,
        G: 0,
        GG: 0,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('https://estoque-backend-hxfb.onrender.com/estoque')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    const estoqueProduto = data.data.collantbasicoadulto || { P: 0, M: 0, G: 0, GG: 0 };
                    setEstoque(estoqueProduto);
                }
            })
            .catch(err => {
                console.error('Erro ao carregar estoque:', err);
            });
    }, []);

    const total = estoque.P + estoque.M + estoque.G + estoque.GG;

    const atualizarEstoqueBackend = async (tamanho, novaQuantidade, tipoOperacao) => {
        setLoading(true);
        try {
            const response = await fetch('https://estoque-backend-hxfb.onrender.com/estoque/atualizar-simples', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    produto_nome: 'Collant Básico Adulto',
                    tamanho,
                    nova_quantidade: novaQuantidade,
                    tipo_operacao: tipoOperacao,
                }),
            });
            const data = await response.json();
            if (data.success) {
                setEstoque(prev => ({
                    ...prev,
                    [tamanho]: novaQuantidade,
                }));
            } else {
                alert('Erro ao atualizar estoque: ' + data.message);
            }
        } catch (error) {
            alert('Erro ao comunicar com o servidor.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const adicionar = (tamanho) => {
        if (loading) return;
        const novaQuantidade = estoque[tamanho] + 1;
        atualizarEstoqueBackend(tamanho, novaQuantidade, 'adicionar');
    };

    const deletar = (tamanho) => {
        if (loading || estoque[tamanho] === 0) return;
            const novaQuantidade = estoque[tamanho] - 1;
            atualizarEstoqueBackend(tamanho, novaQuantidade, 'remover');
    };

    return (
        <div className="estoque-containerr">
            <h2>Colant básico Adulto</h2>
            <div className="estoque-total">
                <strong>Total em estoque:</strong> {total}
            </div>
            <div className="estoque-tamanhos">
                {['P', 'M', 'G', 'GG'].map(tamanho => (
                    <div key={tamanho} className="estoque-tamanho-item">
                        <span className="tamanho-label">{tamanho}</span>
                        <span className="tamanho-quantidade">{estoque[tamanho]}</span>
                        <button className="btn-add" onClick={() => adicionar(tamanho)} disabled={loading}>
                            +
                        </button>
                        <button className="btn-del-gerenciamento" onClick={() => deletar(tamanho)} disabled={loading || estoque[tamanho] === 0}>
                            -
                        </button>
                    </div>
                ))}
            </div>
            <button className="btn-voltar-gerenciamento" onClick={() => navigate('/Gerenciamento')}>Voltar</button>
        </div>
    );
}

export default GColantBasicoAdulto;
