import React, { useState, useEffect } from 'react';
import './Estoque.css';
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

function ColantPreliminarAdulto() {
    const navigate = useNavigate();

    const [estoque, setEstoque] = useState({
        P: 0,
        M: 0,
        G: 0,
        GG: 0,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/estoque')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    const estoqueProduto = data.data.collantpreliminaradulto || { P: 0, M: 0, G: 0, GG: 0 };
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
            const response = await fetch('http://localhost:3001/estoque/atualizar', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    produto_nome: 'Collant Preliminar Adulto',
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

    const deletar = (tamanho) => {
        if (loading || estoque[tamanho] === 0) return;
        if (window.confirm(`Tem certeza que deseja remover 1 unidade do tamanho ${tamanho}?`)) {
            const novaQuantidade = estoque[tamanho] - 1;
            atualizarEstoqueBackend(tamanho, novaQuantidade, 'remover');
        }
    };

    return (
        <div className="estoque-container">
            <h2>Colant preliminar adulto</h2>
            <div className="estoque-total">
                <strong>Total em estoque:</strong> {total}
            </div>
            <div className="estoque-tamanhos">
                {['P', 'M', 'G', 'GG'].map(tamanho => (
                    <div key={tamanho} className="estoque-tamanho-item">
                        <span className="tamanho-label">{tamanho}</span>
                        <span className="tamanho-quantidade">{estoque[tamanho]}</span>
                        <button className="btn-del" onClick={() => deletar(tamanho)} disabled={estoque[tamanho] === 0}>
                            <TiShoppingCart />
                        </button>
                    </div>
                ))}
            </div>
            <button className="btn-voltar" onClick={() => navigate('/Home')}>Voltar</button>
        </div>
    );
}

export default ColantPreliminarAdulto;