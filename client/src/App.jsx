import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/index';
import Register from './components/register/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Layout from './context/layout';
import Home from './pages';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} /> {/* Página Home */}
          {/* Outras rotas com layout */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/checklist" element={<Checklist />} /> */}
          {/* <Route path="/historico" element={<Historico />} /> */}
        </Route>

        <Route path="*" element={<h2>404 - Página não encontrada</h2>} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
