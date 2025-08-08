import React, { useState } from 'react';
import './Estoque.css';
import { useNavigate } from 'react-router-dom';

function Adereco() {
    const [quantidade, setQuantidade] = useState(15);
    const navigate = useNavigate();

    const adicionar = () => {
        setQuantidade(q => q + 1);
    };

    const deletar = () => {
        setQuantidade(q => (q > 0 ? q - 1 : 0));
    };

    return (
        <div className="estoque-container">
            <h2>Adereco</h2>
            <div className="estoque-total">
                <strong>Total em estoque:</strong> {quantidade}
            </div>
            <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
                <button className="btn-add" onClick={adicionar}>+</button>
                <button className="btn-del" onClick={deletar} disabled={quantidade === 0}>-</button>
            </div>
            <button className="btn-voltar" onClick={() => navigate('/Home')}>Voltar</button>
        </div>
    );
}

export default Adereco;
