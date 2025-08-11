import React, { useState, useEffect } from 'react';
import './Estoque.css';
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

function SapatilhaRosa() {
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
                    const qtd = data.data.sapatilharosa || 0;
                    setQuantidade(qtd);
                }
            })
            .catch(err => {
                console.error('Erro ao carregar estoque:', err);
            });
    }, []);

    // Função para atualizar backend
    const atualizarEstoqueBackend = async (novaQuantidade, tipoOperacao) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/estoque/atualizar', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    produto_nome: 'Sapatilha Rosa', // nome exato do produto no banco
                    nova_quantidade: novaQuantidade,
                    tipo_operacao: tipoOperacao,
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

    const deletar = () => {
        if (loading || quantidade === 0) return;
        if (window.confirm(`Tem certeza que deseja remover 1 unidade?`)) {
            const novaQuantidade = quantidade - 1;
            atualizarEstoqueBackend(novaQuantidade, 'remover');
        }
    };

    return (
        <div className="estoque-container">
            <h2>Sapatilha Rosa</h2>
            <div className="estoque-total">
                <strong>Total em estoque:</strong> {quantidade}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button className="btn-del" onClick={deletar} disabled={loading || quantidade === 0}>
                    <TiShoppingCart />
                </button>
            </div>
            <button className="btn-voltar" onClick={() => navigate('/Home')}>Voltar</button>
        </div>
    );
}

export default SapatilhaRosa;
