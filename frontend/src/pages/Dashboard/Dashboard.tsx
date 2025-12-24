import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateCard = () => {
    navigate('/create');
  };

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  const handleViewLibrary = () => {
    navigate('/library');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Leitner</h1>
      </div>

      <section className="dashboard-title">
        <h2>Système Leitner</h2>
        <p>Mémorisez efficacement avec la répétition espacée</p>
      </section>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Créer une carte</h2>
          <button onClick={handleCreateCard} className="dashboard-button create">
            Créer une nouvelle carte
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="dashboard-section">
          <h2>Commencer le Quiz</h2>
          <button onClick={handleStartQuiz} className="dashboard-button quiz">
            Démarrer le Quiz
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="dashboard-section">
          <h2>Bibliothèque</h2>
          <button onClick={handleViewLibrary} className="dashboard-button library">
            Voir la Bibliothèque
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
