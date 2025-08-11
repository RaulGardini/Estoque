import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Movimentacoes.css';

function Movimentacoes() {
    const navigate = useNavigate();
    const [movimentacoes, setMovimentacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [resumo, setResumo] = useState({});
    const [vendasValor, setVendasValor] = useState([]);
    const [totalGeral, setTotalGeral] = useState(0);

    // Buscar movimentações do backend
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            // Buscar movimentações
            const responseMovimentacoes = await fetch('http://localhost:3001/movimentacoes');
            const dataMovimentacoes = await responseMovimentacoes.json();
            setMovimentacoes(dataMovimentacoes);
            
            // Buscar valores das vendas
            const responseValores = await fetch('http://localhost:3001/movimentacoes/vendas-valor');
            const dataValores = await responseValores.json();
            if (dataValores.success) {
                setVendasValor(dataValores.data);
                setTotalGeral(dataValores.total_geral);
            }
            
            // Calcular resumo das vendas (apenas saídas)
            const vendasPorProduto = {};
            dataMovimentacoes.forEach(mov => {
                if (mov.tipo === 'saida') {
                    const key = mov.produto;
                    if (!vendasPorProduto[key]) {
                        vendasPorProduto[key] = {
                            total: 0,
                            tamanhos: {}
                        };
                    }
                    
                    vendasPorProduto[key].total += mov.quantidade;
                    
                    if (mov.tamanho) {
                        if (!vendasPorProduto[key].tamanhos[mov.tamanho]) {
                            vendasPorProduto[key].tamanhos[mov.tamanho] = 0;
                        }
                        vendasPorProduto[key].tamanhos[mov.tamanho] += mov.quantidade;
                    }
                }
            });
            
            setResumo(vendasPorProduto);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            alert('Erro ao carregar dados');
        } finally {
            setLoading(false);
        }
    };

    // Função para limpar todas as movimentações
    const limparTodasMovimentacoes = async () => {
        if (window.confirm('Tem certeza que deseja excluir TODAS as movimentações? Esta ação não pode ser desfeita.')) {
            try {
                const response = await fetch('http://localhost:3001/movimentacoes/limpar', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();

                if (result.success) {
                    alert('Todas as movimentações foram excluídas com sucesso!');
                    // Recarregar os dados
                    fetchData();
                } else {
                    alert('Erro ao excluir movimentações: ' + result.message);
                }
            } catch (error) {
                console.error('Erro ao excluir movimentações:', error);
                alert('Erro ao excluir movimentações');
            }
        }
    };

    // Função para excluir uma movimentação específica
    const excluirMovimentacao = async (movimentacaoId) => {
        if (window.confirm('Tem certeza que deseja excluir esta movimentação?')) {
            try {
                const response = await fetch(`http://localhost:3001/movimentacoes/${movimentacaoId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();

                if (result.success) {
                    alert('Movimentação excluída com sucesso!');
                    // Recarregar os dados
                    fetchData();
                } else {
                    alert('Erro ao excluir movimentação: ' + result.message);
                }
            } catch (error) {
                console.error('Erro ao excluir movimentação:', error);
                alert('Erro ao excluir movimentação');
            }
        }
    };

    // Formatear data
    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Formatear valor monetário
    const formatarValor = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    if (loading) {
        return (
            <div className="movimentacoes-container">
                <h2>Movimentações</h2>
                <p>Carregando...</p>
            </div>
        );
    }

    return (
        <div className="movimentacoes-container">
            <h2>Movimentações</h2>
                <button 
                    style={{marginLeft: '-17rem', marginTop: '1rem', marginRight: '1rem'}} 
                    onClick={() => navigate('/Gerenciamento')}
                >
                    Voltar
                </button>

                
                <button 
                    style={{
                        marginTop: '-2.5rem', 
                        marginLeft: '17rem',
                        color: 'white',
                    }}
                    onClick={limparTodasMovimentacoes}
                >
                    Limpar
                </button>

            
            <div>
                <h3>Resumo de Vendas por Produto</h3>
                {Object.keys(resumo).length === 0 ? (
                    <p>Nenhuma venda registrada</p>
                ) : (
                    <div className="resumo-vendas">
                        {Object.entries(resumo).map(([produto, dados]) => (
                            <div key={produto} className="produto-resumo">
                                <strong>{produto}:</strong> {dados.total} vendidos
                                {Object.keys(dados.tamanhos).length > 0 && (
                                    <div className="tamanhos-resumo">
                                        {Object.entries(dados.tamanhos).map(([tamanho, qtd]) => (
                                            <span key={tamanho} className="tamanho-item">
                                                {tamanho}: {qtd}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Nova seção: Valor Total das Vendas */}
            <div className="vendas-valor-section">
                <h3>Valor Total das Vendas por Produto</h3>
                {vendasValor.length === 0 ? (
                    <p>Nenhuma venda registrada</p>
                ) : (
                    <>
                        <div className="vendas-valor-table">
                            <div className="table-header">
                                <span>Produto</span>
                                <span>Preço Unit.</span>
                                <span>Qtd Vendida</span>
                                <span>Valor Total</span>
                            </div>
                            {vendasValor.map((venda) => (
                                <div key={venda.produto_id} className="table-row">
                                    <span className="produto-nome">{venda.produto}</span>
                                    <span className="preco-unitario">{formatarValor(venda.preco)}</span>
                                    <span className="quantidade-vendida">{venda.total_vendido}</span>
                                    <span className="valor-total">{formatarValor(venda.valor_total)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="total-geral">
                            <strong>Total Geral: {formatarValor(totalGeral)}</strong>
                        </div>
                    </>
                )}
            </div>
            
            <div className="movimentacoes-list">
                <h3>Histórico de Movimentações</h3>
                {movimentacoes.length === 0 ? (
                    <p>Nenhuma movimentação encontrada</p>
                ) : (
                    <div className="movimentacoes-items">
                        {movimentacoes.map((mov) => (
                            <div key={mov.movimentacao_id} className={`movimentacao-item ${mov.tipo}`}>
                                <div className="movimentacao-info">
                                    <span className="produto-nome">{mov.produto}</span>
                                    {mov.tamanho && (
                                        <span className="tamanho">Tamanho: {mov.tamanho}</span>
                                    )}
                                    <span className="quantidade">
                                        Qtd: {mov.quantidade} ({mov.tipo === 'entrada' ? 'Entrada' : 'Saída'})
                                    </span>
                                </div>
                                <div className="data-movimentacao">
                                    {formatarData(mov.data_movimentacao)}
                                </div>
                                <button 
                                    className='btn-excluir'
                                    onClick={() => excluirMovimentacao(mov.movimentacao_id)}
                                    style={{
                                        backgroundColor: '#dc3545',
                                        color: 'white',
                                        border: '1px solid #dc3545',
                                        padding: '5px 10px',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Excluir
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Movimentacoes;