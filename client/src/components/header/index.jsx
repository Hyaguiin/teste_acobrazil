// Header.js
import { useNavigate } from 'react-router-dom';
import './header.scss';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="header">
      <div className="header-left">
      </div>
      <div className="header-right">
        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}
