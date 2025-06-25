import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import useAuth from '../../hooks/authHook';

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Erro ao tentar entrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submit} className="login-form" noValidate>
        <div className="login-logo">
          <img src="/logoaco.png" alt="Logo ACO"  />
        </div>
        <h2 className="login-title">Entrar na sua conta</h2>

        {error && <div className="login-error" role="alert">{error}</div>}

        <label htmlFor="email" className="login-label">
          Email
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            autoComplete="email"
            className="login-input"
          />
        </label>

        <label htmlFor="password" className="login-label">
          Senha
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
            className="login-input"
          />
        </label>

        <button
          type="submit"
          className="login-button"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        <div className="login-register">
          <p>
            Ainda não possui uma conta?{' '}
            <Link to="/register" className="login-register-link">
              Registre-se
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
