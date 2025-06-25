import { Link } from 'react-router-dom';
import './siderbar.scss';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src="/logoaco.png" alt="Logo ACO" className="sidebar-logo" />
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/dashboard/checklist">Checklist</Link></li>
          <li><Link to="/dashboard/historico">Histórico</Link></li>
          <li><Link to="/dashboard/configuracoes">Configurações</Link></li>
        </ul>
      </nav>
    </div>
  );
}
