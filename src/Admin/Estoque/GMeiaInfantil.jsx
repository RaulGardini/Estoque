
import React, { useState, useEffect } from 'react';
import './GEstoque.css';
import { useNavigate } from 'react-router-dom';

function GMeiaInfantil() {
    const [quantidade, setQuantidade] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Buscar estoque do backend ao montar componente
    useEffect(() => {
        fetch('http://localhost:3001/estoque')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    // A chave é o nome do produto formatado (sem espaço, minúsculo e sem acento)
                    const qtd = data.data.meiainfantil || 0;
                    setQuantidade(qtd);
                }
            })
            .catch(err => {
                console.error('Erro ao carregar estoque:', err);
            });
    }, []);

    // Função para atualizar backend (sem registrar movimentação)
const atualizarEstoqueBackend = async (novaQuantidade) => {
    setLoading(true);
    try {
        const response = await fetch('http://localhost:3001/estoque/atualizar-simples', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                produto_nome: 'Meia Infantil', // nome exato do produto no banco
                nova_quantidade: novaQuantidade,
                // não envia tamanho porque o produto não tem
            }),
        });
        const data = await response.json();
        if (data.success) {
            setQuantidade(novaQuantidade);
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

const adicionar = () => {
    if (loading) return;
    const novaQuantidade = quantidade + 1;
    atualizarEstoqueBackend(novaQuantidade);
};

const deletar = () => {
    if (loading || quantidade === 0) return;
    if (window.confirm(`Tem certeza que deseja remover 1 unidade?`)) {
        const novaQuantidade = quantidade - 1;
        atualizarEstoqueBackend(novaQuantidade);
    }
};

    return (
        <div className="estoque-containerr">
            <h2>Meia Infantil</h2>
            <div className="estoque-total">
                <strong>Total em estoque:</strong> {quantidade}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button className="btn-add" onClick={adicionar} disabled={loading}>
                    +
                </button>
                <button className="btn-del-gerenciamento" onClick={deletar} disabled={loading || quantidade === 0}>
                    -
                </button>
            </div>
            <button className="btn-voltar-gerenciamento" onClick={() => navigate('/Gerenciamento')}>Voltar</button>
        </div>
    );
}

export default GMeiaInfantil;
