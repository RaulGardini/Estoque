import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    return (
        <div className="home-container">
            <div className="lista-colunas">
                <button onClick={() => navigate('/ColantBasicoInfantil')} className="coluna-btn btn-com-tamanhos">
                    <div className="btn-content">
                        <h2>Colant básico infantil</h2>
                    </div>
                    <div className="btn-tamanhos">
                        <span>P-</span>
                        <span>M-</span>
                        <span>G-</span>
                        <span>GG-</span>
                    </div>
                </button>
                <button onClick={() => navigate('/ColantBasicoAdulto')} className="coluna-btn btn-com-tamanhos">
                    <div className="btn-content">
                        <h2>Colant básico adulto</h2>
                    </div>
                    <div className="btn-tamanhos">
                        <span>P-</span>
                        <span>M-</span>
                        <span>G-</span>
                        <span>GG-</span>
                    </div>
                </button>
                <button onClick={() => navigate('/ColantPreliminarInfantil')} className="coluna-btn btn-com-tamanhos">
                    <div className="btn-content">
                        <h2>Colant preliminar infantil</h2>
                    </div>
                    <div className="btn-tamanhos">
                        <span>P-</span>
                        <span>M-</span>
                        <span>G-</span>
                        <span>GG-</span>
                    </div>
                </button>
                <button onClick={() => navigate('/ColantPreliminarAdulto')} className="coluna-btn btn-com-tamanhos">
                    <div className="btn-content">
                        <h2>Colant preliminar adulto</h2>
                    </div>
                    <div className="btn-tamanhos">
                        <span>P-</span>
                        <span>M-</span>
                        <span>G-</span>
                        <span>GG-</span>
                    </div>
                </button>
                <button onClick={() => navigate('/Redinha')} className="coluna-btn">
                    <h2>Redinha</h2>
                    <h4>total</h4>
                </button>
                <button onClick={() => navigate('/Adereco')} className="coluna-btn">
                    <h2>Adereço</h2>
                    <h4>total</h4>
                </button>
                <button onClick={() => navigate('/SapatilhaRosa')} className="coluna-btn">
                    <h2>Sapatilha rosa</h2>
                    <h4>total</h4>
                </button>
                <button onClick={() => navigate('/SapatilhaPreta')} className="coluna-btn">
                    <h2>Sapatilha preta</h2>
                    <h4>total</h4>
                </button>
                <button onClick={() => navigate('/MeiaInfantil')} className="coluna-btn">
                    <h2>Meia infantil</h2>
                    <h4>total</h4>
                </button>
                <button onClick={() => navigate('/MeiaAdulto')} className="coluna-btn">
                    <h2>Meia Adulto</h2>
                    <h4>total</h4>
                </button>
            </div>
        </div>
    );
}

export default Home;