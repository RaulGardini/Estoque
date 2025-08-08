import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Formulario.css';

function Formulario() {
    const navigate = useNavigate();
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!senha) {
      setErro('Por favor, digite a senha');
      return;
    }
    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    setErro('');
    // Aqui você pode adicionar a lógica de autenticação
    alert('Login realizado!');
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
            onChange={e => setSenha(e.target.value)}
            placeholder="Digite a senha"
            autoComplete="current-password"
            required
          />
        </div>
        {erro && <span className="erro-msg">{erro}</span>}
        <button  onClick={() => navigate('/Home')} type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Formulario;