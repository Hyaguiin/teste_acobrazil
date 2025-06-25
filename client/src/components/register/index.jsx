import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './register.scss';
import useAuth from '../../hooks/authHook';

export default function Register() {
  const { signUp } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      toast.error('As senhas não coincidem!');
      setLoading(false);
      return;
    }

    try {
      await signUp({ username, email, password });
      toast.success('Cadastro realizado com sucesso! 🎉');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Falha ao registrar.');
      toast.error(err.message || 'Falha ao registrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={submit} className="register-form" noValidate>
        <div className="register-logo">
          <img src="/logoaco.png" alt="Logo ACO" />
        </div>
        <h2 className="register-title">Criar Conta</h2>

        {error && <div className="register-error" role="alert">{error}</div>}

        <label htmlFor="username" className="register-label">
          Nome de usuário
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Seu nome de usuário"
            required
            className="register-input"
          />
        </label>

        <label htmlFor="email" className="register-label">
          Email
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            className="register-input"
          />
        </label>

        <label htmlFor="password" className="register-label">
          Senha
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="register-input"
            autoComplete="new-password"
          />
        </label>

        <label htmlFor="confirmPassword" className="register-label">
          Confirmar Senha
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="register-input"
            autoComplete="new-password"
          />
        </label>

        <button
          type="submit"
          className="register-button"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>

        <div className="register-login">
          <p>
            Já possui uma conta?{' '}
            <Link to="/login" className="register-login-link">
              Faça login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
