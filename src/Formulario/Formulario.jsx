import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Formulario.css';

function Formulario() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3001/login/validar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senha }),
      });

      const data = await response.json();

      if (data.success) {
        // Senha válida, navegar para Home
        navigate('/Home');
      } else {
        // Senha inválida
        setError(data.message || 'Senha incorreta');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error('Erro ao validar senha:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Senha</h2>
        <div className="input-group">
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a senha"
            autoComplete="current-password"
            required
            disabled={loading}
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" disabled={loading || !senha.trim()}>
          {loading ? 'Validando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default Formulario;