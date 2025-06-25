import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/siderbar/index';
import Header from '../components/header/index';
import Footer from '../components/footer/index';
import useAuth from '../hooks/authHook';
import './layout.scss';

export default function Layout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content-area">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}
