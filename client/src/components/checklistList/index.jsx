import React, { useState, useEffect } from 'react';
import { fetchChecklists } from '../../services/checkListService'; 
import './checkListList.scss'

export default function ChecklistList() {
  const [checklists, setChecklists] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      setError('Você precisa estar logado para visualizar seus checklists.');
      return;
    }

    const loadChecklists = async () => {
      try {
        const data = await fetchChecklists(userId);
        setChecklists(data);
      } catch (err) {
        setError('Erro ao carregar os checklists.');
      }
    };

    loadChecklists();
  }, []);

  return (
    <div className="checklist-list-container">
      <h2>Checklists</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="checklist-list">
        {checklists.length === 0 ? (
          <p>Você ainda não tem checklists registrados.</p>
        ) : (
          checklists.map((checklist) => (
            <div key={checklist.id} className="checklist-item">
              <h3>{checklist.type === 'start' ? 'Início' : 'Fim'}</h3>
              <p><strong>Pneus:</strong> {checklist.tiresOk ? 'Em bom estado' : 'Precisa de atenção'}</p>
              <p><strong>Freios:</strong> {checklist.brakesOk ? 'Em bom estado' : 'Precisa de atenção'}</p>
              <p><strong>Luzes:</strong> {checklist.lightsOk ? 'Em bom estado' : 'Precisa de atenção'}</p>
              <p><strong>Observações:</strong> {checklist.observations}</p>
              <p><small>Criado em: {new Date(checklist.createdAt).toLocaleString()}</small></p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
