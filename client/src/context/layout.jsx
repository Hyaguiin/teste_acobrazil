import { Outlet } from 'react-router-dom';
import Sidebar from '../components/siderbar/index';
import Header from '../components/header/index';
import Footer from '../components/footer/index';
import './layout.scss';

export default function Layout() {
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
