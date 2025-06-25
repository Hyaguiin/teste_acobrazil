import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/index';
import Register from './components/register/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Layout from './context/layout';
import Home from './pages';
import CreateChecklist from './components/checklistList/index'; 
import ChecklistList from './components/checklist/index'; 

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard/checklist" element={<ChecklistList />} /> 
          <Route path="/dashboard/checklist/create" element={<CreateChecklist />} /> 
        </Route>

        <Route path="*" element={<h2>404 - Página não encontrada</h2>} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
