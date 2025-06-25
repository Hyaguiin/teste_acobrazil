import React from 'react';
import './home.scss';

export default function Home() {
  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Bem-vindo ao Sistema!</h1>
        <p className="description">Escolha uma das opções no menu à esquerda para começar a usar o sistema.</p>
      </div>
    </div>
  );
}
