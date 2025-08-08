import React, { useState } from 'react';
import './Estoque.css';
import { useNavigate } from 'react-router-dom';

function ColantPreliminarAdulto() {
    const navigate = useNavigate();
    const [estoque, setEstoque] = useState({
        P: 10,
        M: 8,
        G: 5,
        GG: 2
    });

    const total = estoque.P + estoque.M + estoque.G + estoque.GG;

    const adicionar = (tamanho) => {
        setEstoque(prev => ({
            ...prev,
            [tamanho]: prev[tamanho] + 1
        }));
    };

    const deletar = (tamanho) => {
        setEstoque(prev => ({
            ...prev,
            [tamanho]: prev[tamanho] > 0 ? prev[tamanho] - 1 : 0
        }));
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
                        <button className="btn-add" onClick={() => adicionar(tamanho)}>
                            +
                        </button>
                        <button className="btn-del" onClick={() => deletar(tamanho)} disabled={estoque[tamanho] === 0}>
                            -
                        </button>
                    </div>
                ))}
            </div>
            <button className="btn-voltar" onClick={() => navigate('/Home')}>Voltar</button>
        </div>
    );
}

export default ColantPreliminarAdulto;