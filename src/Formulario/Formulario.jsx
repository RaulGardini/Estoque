import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Formulario.css';

function Formulario() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validarSenha = async () => {
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
        return data.data; // retorna { permissao: 'Usuario' ou 'Admin', senha_id: ... }
      } else {
        setError(data.message || 'Senha incorreta');
        return null;
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error('Erro ao validar senha:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleEntrarUsuario = async (e) => {
    e.preventDefault();
    
    const dadosUsuario = await validarSenha();
    
    if (dadosUsuario && dadosUsuario.permissao === 'Usuario') {
      // Senha de usuário válida, navegar para Home
      navigate('/Home');
    } else if (dadosUsuario && dadosUsuario.permissao === 'Admin') {
      // Senha de admin usada no botão de usuário - permitir acesso ao Home também
      navigate('/Home');
    } else if (dadosUsuario) {
      setError('Permissão não reconhecida');
    }
    // Se dadosUsuario for null, a mensagem de erro já foi definida em validarSenha
  };

  const handleEntrarGerenciamento = async (e) => {
    e.preventDefault();
    
    const dadosUsuario = await validarSenha();
    
    if (dadosUsuario && dadosUsuario.permissao === 'Admin') {
      // Senha de admin válida, navegar para Gerenciamento
      navigate('/Gerenciamento');
    } else if (dadosUsuario && dadosUsuario.permissao === 'Usuario') {
      // Senha de usuário não tem permissão para gerenciamento
      setError('Acesso negado. Você não tem permissão para acessar o gerenciamento.');
    }
    // Se dadosUsuario for null, a mensagem de erro já foi definida em validarSenha
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Acesso ao Sistema</h2>
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
        
        <div className="buttons-container">
          <button 
            type="button"
            onClick={handleEntrarUsuario}
            className="btn-usuario"
          >
            {loading ? 'Validando...' : 'Entrar como Usuário'}
          </button>
          
          <button 
            type="button"
            onClick={handleEntrarGerenciamento}
            className="btn-admin"
          >
            {loading ? 'Validando...' : 'Acessar Gerenciamento'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Formulario;