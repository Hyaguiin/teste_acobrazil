import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createChecklist } from '../../services/checkListService';
import './checklistCreate.scss'

export default function CreateChecklist() {
  const [type, setType] = useState('start');
  const [tiresOk, setTiresOk] = useState(false);
  const [brakesOk, setBrakesOk] = useState(false);
  const [lightsOk, setLightsOk] = useState(false);
  const [observations, setObservations] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    console.log("UserId armazenado no localStorage:", storedUserId); 
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setError('Você precisa estar logado para criar um checklist.');
      console.log("Redirecionando para login porque o userId não foi encontrado.");
      navigate('/login'); 
    }
  }, [navigate]);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  if (!userId) {
    setError('Você precisa estar logado para criar um checklist.');
    return;
  }

  const checklistData = {
    type,
    tiresOk,
    brakesOk,
    lightsOk,
    observations,
    userId,
  };

  try {
    const response = await createChecklist(checklistData);
    console.log("Checklist criado com sucesso!", response);
    navigate('/home');
  } catch (err) {
    setError('Erro ao criar checklist. Tente novamente.');
    console.log("Erro ao criar checklist:", err); 
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="create-checklist-container">
      <h2>Criar Checklist</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="create-checklist-form">
        <div className="form-group">
          <label>Tipo de Checklist:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="start">Início</option>
            <option value="end">Fim</option>
          </select>
        </div>
        <div className="form-group">
          <label>Pneus em bom estado:</label>
          <input
            type="checkbox"
            checked={tiresOk}
            onChange={(e) => setTiresOk(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label>Freios em bom estado:</label>
          <input
            type="checkbox"
            checked={brakesOk}
            onChange={(e) => setBrakesOk(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label>Luzes em bom estado:</label>
          <input
            type="checkbox"
            checked={lightsOk}
            onChange={(e) => setLightsOk(e.target.checked)}
          />
        </div>
        <div className="form-group">
          <label>Observações:</label>
          <textarea
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            placeholder="Escreva suas observações aqui..."
          />
        </div>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Checklist'}
        </button>
      </form>
    </div>
  );
}
